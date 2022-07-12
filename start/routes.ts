/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})
Route.get('/posts', 'PostsController.index');
Route.get('/ambil', 'PostsController.getData');
Route.get('/stok','StoksController.getData');
Route.get('/stok/all','StoksController.getAllData');

// Route.group(() => {
//   Route.post('users', 'UsersController.store')
//   Route.get('users', 'UsersController.index')
//   Route.get('users/:id', 'UsersController.show')
//   Route.put('users/:id', 'UsersController.update')
//   Route.delete('users/:id', 'UsersController.destroy')
// }).prefix('/api/v1')


Route.post("/login", "UsersController.login");
Route.get("/login", "UsersController.showLogin");
Route.post("/register", "UsersController.register");
Route.get("/register", "UsersController.showRegister");
Route.post("/logout", "UsersController.logout");

Route.get('/google/redirect', async ({ ally }) => {  
  // return ally.use('google').redirect()
  return ally.use('google').stateless().redirect()
})
Route.get('/google/callback', async ({ ally }) => {

  const data = await ally.use('google').stateless().user()
  console.log(data.email);
  console.log(data.name);
  console.log(data.token);
  console.log(data.emailVerificationState);
  
  // const user = await User.firstOrCreate({
  //   email: data.email,
  // }, {
  //   name: user.name,
  //   accessToken: user.token.token,
  //   isVerified: user.emailVerificationState === 'verified'
  // })
  
})


