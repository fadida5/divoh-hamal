export const signup = (user) => {
    return fetch(`http://localhost:8000/api/signup`,{
       method: "POST",
       headers:{
           Accept:'application/json',
           "Content-Type": "application/json"
       },
       body: JSON.stringify(user)
   })
   .then(response => {
       return response.json()
   })
   .catch(err => {
       console.log(err)
   })
}
export const signin = (user) => {
    return fetch(`http://localhost:8000/api/signin`,{
       method: "POST",
       headers:{
           Accept:'application/json',
           "Content-Type": "application/json"
       },
       body: JSON.stringify(user)
   })
   .then(response => {
       return response.json()
   })
   .catch(err => {
       console.log(err)
   })
}
export const signout = () => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('emergencyuser')
        return fetch(`/api/signout`, {
            method: "GET",
        })
        .then(response => {
            console.log('signout', response)
        })
        .catch(err => console.log(err));
}
}

export const authenticate = (data) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('emergencyuser', JSON.stringify(data))
    }
}

export const isAuthenticated = () => {
    if(typeof window == 'undefined') {
        return false;
    }
    if(localStorage.getItem('emergencyuser')) {
        return JSON.parse(localStorage.getItem('emergencyuser'));
    } else {
        return false;
    }
}