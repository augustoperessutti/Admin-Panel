const isLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        const error = new Error('Necesitas logearte para acceder.')
        error.status = 401
        return next(error)
    }
}

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.role === 'admin') {
            return next()
        } else {
            const errorAdm = new Error('Acceso solo para el personal de administración.')
            errorAdm.status = 403
            return next(errorAdm)
        }
    } else {
        const error = new Error('Necesitas logearte para acceder.')
        error.status = 403
        return next(error)
    }
}

module.exports = { isLogged, isAdmin }