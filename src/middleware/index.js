import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import Poll from '../models/polls';

const TOKENTIME = 60*60*24*30;
const SECRET = new Buffer('supersecret','base64' );

let authenticate = expressJwt({secret: SECRET});

let generateAccessToken = (req, res, next) => {
    req.token = req.token || {};
    req.token = jwt.sign(
        {id: req.user.id},
        SECRET,
        {expiresIn: TOKENTIME},
    );
    next();
}

let respond = (req, res) => {
    res.status(200).json({
        id: req.user.id,
        user: req.user.username,
        token: req.token,
        profile: req.user.profile
    });
}

module.exports =  {
    authenticate,
    generateAccessToken,
    respond
}