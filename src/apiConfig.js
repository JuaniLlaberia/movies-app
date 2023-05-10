const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'ea962e6c660af4bd263293356299c277',
    posterImgUrl: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    bgImgUrl: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;