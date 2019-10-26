//Return true if the enviromment its in localhost
export const develop: boolean = window.location.hostname == "localhost";
export const environment = {
    apiUrl: 'http://localhost:3000'
};