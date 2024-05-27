import axios from 'axios';
import { postRequest } from '../utils/apiRequests.js';

class KundliRequests {
    constructor(apiUrl, apiKey) {
        this.api_url = apiUrl;
        this.key = apiKey;
    }

    //************************* Planet start *********************************
    // 1) getAllPlanetData

    getAllPlanetData = async (data) => {
        try {
            const response = await postRequest({
                url: `${this.api_url}/planet/getAllPlanetData`,
                data: data
            });

            if (!response) {
                throw new Error("API request failed or returned null");
            }

            return response

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch planet positions");
        }
    }



    // 2) getAllUpgrahaData 

    getAllUpgrahaData = async (data) => {
        try {
            const response = await postRequest({
                url: `${this.api_url}/planet/getAllUpgrahaData`,
                data: data
            });

            if (!response) {
                throw new Error("API request failed or returned null");
            }

            return response;

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch all graha Data");
        }
    }

    // 3) getDashamBhavMadhyaData

    getDashamBhavMadhyaData = async (data) => {
        try {
            const response = await postRequest({
                url: `${this.api_url}/planet/getDashamBhavMadhyaData`,
                data: data
            });

            if (!response) {
                throw new Error("API request failed or returned null");
            }

            return response;

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch all Dasham BhavMadhya Data");
        }
    }

    // 4) getAshtakVargaData

    getAshtakVargaData = async (data) => {
        try {
            const response = await postRequest({
                url: `${this.api_url}/planet/getAshtakVargaData`,
                data: data
            });

            if (!response) {
                throw new Error("API request failed or returned null");
            }

            return response;

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch all get Ashtak Varga Data");
        }
    }

    // 5) getSarvashtakData

    getSarvashtakData = async (data) => {
        try {
            const response = await postRequest({
                url: `${this.api_url}/planet/getSarvashtakData`,
                data: data
            });

            if (!response) {
                throw new Error("API request failed or returned null");
            }

            return response;

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch all get Sarvashtak Data");
        }
    }

    // 6) getTransitData

    getTransitData = async (data) => {
        try {
            const response = await postRequest({
                url: `${this.api_url}/planet/getTransitData`,
                data: data
            });

            if (!response) {
                throw new Error("API request failed or returned null");
            }

            return response;

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch all Transit Data");
        }
    }


    //************************* Planet end *********************************

    //************************* Chart start *********************************

    // 1) getLagnaChart
    getLagnaChart = async (data) => {
        try {
            const response = await postRequest({
                url: `${this.api_url}/charts/getLagnaChart`,
                data: data
            });

            if (!response) {
                throw new Error("API request failed or returned null");
            }

            return response;

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch get all Lagna Chart");
        }
    }

    // 2) getMoonChart
    getMoonChart = async (data) => {
        try {
            const response = await postRequest({
                url: `${this.api_url}/charts/getMoonChart`,
                data: data
            });

            if (!response) {
                throw new Error("API request failed or returned null");
            }

            return response;

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch all Moon Chart");
        }
    }

    // 3) getSunChart
    getSunChart = async (data) => {
        try {
            const response = await postRequest({
                url: `${this.api_url}/charts/getSunChart`,
                data: data
            });

            if (!response) {
                throw new Error("API request failed or returned null");
            }

            return response;

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch all Sun Chart");
        }
    }

    // 4) getChalitChart
    getChalitChart = async (data) => {
        try {
            const response = await postRequest({
                url: `${this.api_url}/charts/getChalitChart`,
                data: data
            });

            if (!response) {
                throw new Error("API request failed or returned null");
            }

            return response;

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch all Chalit Chart");
        }
    }

    // 5) getHoraChart
    getHoraChart = async (data) => {
        try {
            const response = await postRequest({
                url: `${this.api_url}/charts/getHoraChart`,
                data: data
            });

            if (!response) {
                throw new Error("API request failed or returned null");
            }

            return response;

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch all Hora Chart");
        }
    }

    // 6) getDreshkanChart
    getDreshkanChart = async (data) => {
        try {
            const response = await postRequest({
                url: `${this.api_url}/charts/getDreshkanChart`,
                data: data
            });

            if (!response) {
                throw new Error("API request failed or returned null");
            }

            return response;

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch all Dreshkan Chart");
        }
    }

    // 7) getNavamanshaChart
    getNavamanshaChart = async (data) => {
        try {
            const response = await postRequest({
                url: `${this.api_url}/charts/getNavamanshaChart`,
                data: data
            });

            if (!response) {
                throw new Error("API request failed or returned null");
            }

            return response;

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch all Navamansha Chart");
        }
    }

    // 8) getDashamanshaChart
    getDashamanshaChart = async (data) => {
        try {
            const response = await postRequest({
                url: `${this.api_url}/charts/getDashamanshaChart`,
                data: data
            });

            if (!response) {
                throw new Error("API request failed or returned null");
            }

            return response;

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch all Dashamansha Chart");
        }
    }

    // 9) getDwadashamanshaChart
    getDwadashamanshaChart = async (data) => {
        try {
            const response = await postRequest({
                url: `${this.api_url}/charts/getDwadashamanshaChart`,
                data: data
            });

            if (!response) {
                throw new Error("API request failed or returned null");
            }

            return response;

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch all Dwadashamansha Chart");
        }
    }

    // 10) getTrishamanshaChart
    getTrishamanshaChart = async (data) => {
        try {
            const response = await postRequest({
                url: `${this.api_url}/charts/getTrishamanshaChart`,
                data: data
            });

            if (!response) {
                throw new Error("API request failed or returned null");
            }

            return response;

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch all Trishamansha Chart");
        }
    }

    // 11) getShashtymshaChart
    getShashtymshaChart = async (data) => {
        try {
            const response = await postRequest({
                url: `${this.api_url}/charts/getShashtymshaChart`,
                data: data
            });

            if (!response) {
                throw new Error("API request failed or returned null");
            }

            return response;

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch all Shashtymsha Chart");
        }
    }

    //************************* Chart end *********************************

    //************************* Dasha Start *******************************

    // 1) kalsharpDoshaAnalysis
    kalsharpDoshaAnalysis = async (data) => {
        try {
            const response = await postRequest({
                url: `${this.api_url}/dosha/kalsharpDoshaAnalysis`,
                data: data
            });

            if (!response) {
                throw new Error("API request failed or returned null");
            }

            return response;

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch kalsharp Dosha Analysis");
        }
    }

    // 2) pitriDoshaAnalysis
    pitriDoshaAnalysis = async (data) => {
        try {
            const response = await postRequest({
                url: `${this.api_url}/dosha/pitriDoshaAnalysis`,
                data: data
            });

            if (!response) {
                throw new Error("API request failed or returned null");
            }

            return response;

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch pitri Dosha Analysis");
        }
    }

    // 3) getShashtymshaChart
    mangalDoshaAnalysis = async (data) => {
        try {
            const response = await postRequest({
                url: `${this.api_url}/dosha/mangalDoshaAnalysis`,
                data: data
            });

            if (!response) {
                throw new Error("API request failed or returned null");
            }

            return response;

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch mangal Dosha Analysis");
        }
    }

    // 4) getShashtymshaChart
    sadhesatiAnalysis = async (data) => {
        try {
            const response = await postRequest({
                url: `${this.api_url}/dosha/sadhesatiAnalysis`,
                data: data
            });

            if (!response) {
                throw new Error("API request failed or returned null");
            }

            return response;

        } catch (e) {
            console.error(e);
            throw new Error("Failed to fetch sadhesati Analysis");
        }
    }
    //************************* Dasha end *********************************

}


const apiUrl = process.env.API_URL || 'http://3.129.168.130:4001/api-docs/';
const apiKey = process.env.API_KEY || 'cbd2a0f2-9f51-47a4-b8c5-c926f9deadf9';

export const KundliRequest = new KundliRequests(apiUrl, apiKey);