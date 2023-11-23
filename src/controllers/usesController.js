const userService = require('../services/userService');

class UserController {
    static async signUp (req, res) {
        try {
            const newUser = await userService.register(req.body);
            res.status(200).json(newUser);
        } catch (error) {
            res.status(500).json({mensagem: "mensagem de erro"});
        }
    }

    static async signIn (req, res) {
        try {
            const userLogin = await userService.login(req.body);
            res.status(200).json(userLogin);
        } catch (error) {
            res.status(500).json({mensagem: "mensagem de erro"});
        }
    }
}

module.exports = UserController;