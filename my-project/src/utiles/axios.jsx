import axios from "axios"

const instance= axios.create({
baseURL: "https://api.themoviedb.org/3/",
headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTJiNjdkNTcyMmEzNmIyN2Y4Yjk0NjU5NTdmNmMzYyIsIm5iZiI6MTcyNTM1OTY2NS45OTMyOTQsInN1YiI6IjY2ZDZlNDA5MmZhMWE0ZTc2MDk0NmEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YXZnxDkCpfeI16eNvMMmr3Wx4WeeA6nkqxWqt5fVKb8'
  },
});

export default instance;