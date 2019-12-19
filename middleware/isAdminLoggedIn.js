module.exports = (req, res, next) => {
    if(req.user && req.user.admin) {
        // Someone is logged in; AAAAND they're an admin! GANG WAY! let them through!
        next()
    }
    else {
        //No one is logged in, or they don't belong. This is bad. Redirect them away from protected page
        req.flash('error', 'You must be an admin to view this page!')
        res.redirect('/profile')
    }
}