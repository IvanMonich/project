const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            // console.log(req.body)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }

            const { email, password, type } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({message: "Такой пользователь уже существует!"})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword, type })

            await user.save()

            res.status(201).json({message: "Пользователь создан!"})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова!'})
        }
    })

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите корректный пароль').exists()
    ],
    async (req,res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: "Неверный данные пользователя попробуйте снова (email)"})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: "Неверный данные пользователя попробуйте снова"})
            }

            const token = jwt.sign (
                { userID: user.id },
                config.get('jwtSecret'),
                {expiresIn: '1h' }
            )

            res.json({token, userID: user.id, type: user.type})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова!'})
        }
    })

module.exports = router