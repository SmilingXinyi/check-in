/**
 * @file (login)
 * Created by Xinyi on 2019-08-14.
 */

module.exports = (req, res) => {
    res.setHeader('location', 'http://www.google.com');
    res.status(204).json(null)
    // res.status(200).json({
    //     email: 'demo@gmail.com'
    // })
}
