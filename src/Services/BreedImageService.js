export default class BreedImageService {
     url = "https://dog.ceo/api/breed/pug/images/random/10"

    static myInstance = null;

    /**
     * Provide instance for calling services
     * @returns {null}
     */
    static getInstance() {
        if (BreedImageService.myInstance == null) {
            BreedImageService.myInstance = new BreedImageService();
        }
        return this.myInstance;
    }

    /**
     * Get list of all breed
     * @returns {Promise<any>}
     */
    getAllBreed =()=>
        fetch("https://dog.ceo/api/breeds/list/all").then(response => response.json());

    /**
     * Get 10 random images with certain breeds
     * @param keyword breed name chosen by user or default(pug)
     * @returns {Promise<any>}
     */
    searchFunc =(keyword) =>
        fetch(`https://dog.ceo/api/breed/${keyword}/images/random/10`).then(response => response.json());
}
