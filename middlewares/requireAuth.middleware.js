import { setupAsyncLocalStorage } from './setupAls.middleware.js'

export function requireAuth(req, res, next) {
    const { loggedinUser } = setupAsyncLocalStorage.getStore()
    req.loggedinUser = loggedinUser
    if (!loggedinUser) return res.status(401).send('Not Authenticated')
    next()
}
