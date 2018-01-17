import React from "react";
import axios from "axios";

import { BASE_URL } from "../constants";

export default class CommunicationService extends React.Component {
    getRequest(address, successHandler, errorHandler) {
        const requestURL = `${BASE_URL}/${address}`;

        axios.get(requestURL)
            .then(response => {
                successHandler(response.data);
            })
            .catch(error => {
                console.log(error);
                let errorMsg = error.response ? error.response.code : "Server unavailable";
                errorHandler(errorMsg);
            });
    }
    
    postRequest(body, successHandler, errorHandler) {
        const requestURL = `${BASE_URL}/reports`;

        axios.post(requestURL, body)
            .then(response => {
                successHandler(response);
            })
            .catch(error => {
                console.log(error);
                let errorMsg = error.response ? error.response.data.error.message : "Server unavailable";
                errorHandler(errorMsg);
            });
    }

    deleteRequest(id, deleteHandler, errorHandler) {
        const requestURL = `${BASE_URL}/reports/${id}`;
        
        axios.delete(requestURL)
            .then(response => deleteHandler(response))
            .catch(error => errorHandler(error));
    }
}