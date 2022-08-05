import 'reflect-metadata'

import path from 'path'
import dotenv from 'dotenv'
import commandLineArgs from 'command-line-args'

const options = commandLineArgs([
    {
        name: 'env',
        alias: 'e',
        defaultValue: 'development',
        type: String,
    },
])

const config = dotenv.config({
    path: path.join(__dirname, `env/${options.env as string}.env`),
})

if (config.error) {
    throw config.error;
}
