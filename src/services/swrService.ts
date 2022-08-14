import { UserCredentials } from '../payloads/userCredentials'
import { AuthedUser } from '../payloads/authedUser'
import { HttpMethod } from '../utilities/enum'
import { HttpError } from '../utilities/error'
import { parseCookies, formData, request } from '../utilities/request'
import { insidersService } from './insidersService'

/**
 * Includes service calls to the main skinwalker-ranch.com website
 */
export const swrService = {
    /**
     * Authenticates user against the SWR website, retrieves an existing insider
     * or creates a new one if it's the first time they are singing in
     * (May throw an error if credentials are invalid or if the website changes its auth method)
     * @param credentials
     */
    async login(credentials: UserCredentials): Promise<AuthedUser> {
        const body = formData({
            log: credentials.email,
            pwd: credentials.password,
            'wp-submit': 'Log In',
            'mepr_process_login_form': 'true',
            'mepr_is_login_page': 'true'
        })

        const response = await request('https://skinwalker-ranch.com/login/', {
            method: HttpMethod.Post,
            headers: body.getHeaders(),
            data: body,
            withCredentials: true,
            maxRedirects: 0,
            validateStatus: status => {
                return status >= 200 && status < 303
            }
        })

        if (response.status >= 400) {
            throw new HttpError(401, 'Invalid credentials')
        }

        const cookieMap = parseCookies(response.headers)
        const wordpressLoggedInCookie = Object.entries(cookieMap)
            .find(([name]) => name.startsWith('wordpress_logged_in'))?.[1]

        if (!wordpressLoggedInCookie) {
            throw new Error('Unable to log in to skinwalker-ranch.com')
        }

        const [email] = decodeURIComponent(wordpressLoggedInCookie.value).split(/\|/)
        const existingInsider = await insidersService.getInsiderByEmail(email)

        if (!existingInsider) {
            return insidersService.createInsider({ email })
        }

        return existingInsider
    }
}