import { UserCredentials } from '../payloads/userCredentials'
import { AuthedUser } from '../payloads/authedUser'
import { parseCookies, formData, request } from '../utilities/request'
import { HttpMethod } from '../utilities/enum'
import { insidersService } from './insidersService'

export const swrService = {

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
            throw new Error('Invalid credentials')
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