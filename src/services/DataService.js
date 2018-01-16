import CommunicationService from "./CommunicationService";

export default class DataService {
    constructor() {
        this.communicationService = new CommunicationService();
    }

    getReportsData(successHandler, errorHandler) {
        this.communicationService.getRequest("reports", (response) => {
            successHandler(response);
        }, (error) => {
            errorHandler(error);
        });
    }

    createReport(reportData, successHandler, errorHandler) {
        this.communicationService.postRequest(
            reportData,
            (response) => {
                successHandler(response.data);
            },
            (error) => {
                errorHandler(error);
            });
    }
}