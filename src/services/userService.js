const { hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../utilities/dbConfig');
const isValidEmail = require('../utilities/emailValidator');

class userService {
    static async signUp (userData) {
        const { nome, email, senha, telefones } = userData;
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        
        if (existingUser.rows[0]) throw 'E-mail já existente';
        
        if (typeof(nome) == 'string' && isValidEmail(email) && senha && telefones) {
            try {
                const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: 60 * 30 });

                let hashSenha;
                await hash(senha, 13).then((hash) => hashSenha = hash);

                const queryText = 'INSERT INTO users(nome,email,senha,telefones,token) VALUES ($1,$2,$3,$4,$5);';
                const queryValues = [nome, email, hashSenha, JSON.stringify(telefones), token];
                
                await pool.query(queryText, queryValues);
                const result = await pool.query("SELECT id, data_criacao, data_atualizacao, ultimo_login, token FROM users WHERE email = $1", [email]);

                return result.rows;
            } catch (error) {
                throw error;
            }
        }
    }

    static async signIn (userData) {
        const { email, senha } = userData;
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        
        if (!(existingUser.rows[0])) throw { message: 'Usuário e/ou senha inválidos' };
        
        const correctPassword = await compare(senha, existingUser.rows[0].senha);

        if (correctPassword) {
            const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: 60 * 30 });
            await pool.query("UPDATE users SET ultimo_login = CURRENT_TIMESTAMP, token = $1 WHERE email = $2", [token, email]);
            const result = await pool.query("SELECT id, data_criacao, data_atualizacao, ultimo_login, token FROM users WHERE email = $1", [email]);

            return result.rows[0];
        } else {
          throw { message: 'Usuário e/ou senha inválidos', status: '401' };
        }
    }

    static async findOne (userId) {       
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
        if (!user.rows[0]) throw { message: 'Não existe usuário com esse Id cadastrado', status: '404' };

        return user.rows[0];
    }
}

module.exports = userService;