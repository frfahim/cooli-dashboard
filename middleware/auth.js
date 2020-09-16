export default function (context) {
  const token = localStorage.getItem("UserToken")
  const user = localStorage.getItem("User")
  if (!(token && user)) {
    context.redirect('/login')
  }
}
