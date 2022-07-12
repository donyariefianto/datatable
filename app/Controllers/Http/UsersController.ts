import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const input = request.only(['username', 'email'])
    try {
      const users = await User.create(input)

      return response.status(200).json({ code: 200, status: 'success', data: users })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async index({ response }: HttpContextContract) {
    const users = await User.all()
      return response.status(200).json({ code: 200, status: 'success', data: users })
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const users = await User.findBy('id', params.id)

      return response.status(200).json({ code: 200, status: 'success', data: users })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }
  
  public async update({ params, request, response }: HttpContextContract) {
    const input = request.only(['username', 'email'])
    try {
      const users = await User.findBy('id', params.id)
      users?.merge(input)

      await users?.save()

      return response.status(200).json({ code: 200, status: 'success', data: users })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const users = await User.findBy('id', params.id)
      await users?.delete()

      return response.status(200).json({ code: 200, status: 'success', data: users })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }
  
  public async showLogin({ view }: HttpContextContract) {
    return view.render('auth/login', { user: { email: '', password: '' } })
  }
  
  public async showRegister({ view }: HttpContextContract) {
    return view.render('auth/register', { user: { name: '', email: '', password: '' } })
  }
  
  public async login({ request, response, auth, session }: HttpContextContract) {
    try {
      await auth.attempt(request.input('email'), request.input('password'))
      return response.redirect('/')
    } catch (e) {
      session.flash('notification', 'Login failed. Check email/password & retry.')
      return response.redirect('back')
    }
  }


  
}
