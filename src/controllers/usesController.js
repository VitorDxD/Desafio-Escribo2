const userService = require('../services/userService');

class UserController {
    static async signUp (req, res) {
        try {
            const newUser = await userService.signUp(req.body);
            res.status(200).json(newUser);
        } catch (error) {
            console.log(error);
            res.status(500).json({mensagem: error});
        }
    }

    static async signIn (req, res) {
        try {
            const userLogin = await userService.signIn(req.body);
            res.status(200).json(userLogin);
        } catch (error) {
            res.status(error.status || 500).json({mensagem: error.message || 'Ocorreu um erro inesperado'});
        }
    }

    static async findOne (req, res) {
        try {
            const user = await userService.findOne(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(error.status || 500).json({mensagem: error.message || 'Ocorreu um erro inesperado'});
        }
    }
}

module.exports = UserController;