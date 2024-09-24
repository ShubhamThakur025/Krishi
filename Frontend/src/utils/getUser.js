import { jwtDecode } from 'jwt-decode'
import getCookie from './getCookie'

function getUser() {
    const userToken = getCookie('userToken')
    if (!userToken) {
        console.log(userToken)
        return null
    }
    try {
        const decodedToken = jwtDecode(userToken);
        return decodedToken;
    }
    catch (error) {
        console.log('Failed to decode token', error);
        return null;
    }
}

export default getUser