const getCookie = (cookieName) => {
    const cookies = document.cookie
    const cookieValue = cookies
      .split("; ")
      .find(row => row.startsWith(cookieName + '='))
    console.log(cookieValue)
    return cookieValue ? cookieValue.split('=')[1] : null
  }

export default getCookie