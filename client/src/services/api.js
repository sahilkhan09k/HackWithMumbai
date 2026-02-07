const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            credentials: 'include',
        };

        try {
            const response = await fetch(url, config);

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            if (!response.ok) {
                // Create error with status code for better handling
                const error = new Error(data.message || `HTTP error! status: ${response.status}`);
                error.status = response.status;
                error.data = data;
                throw error;
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    async uploadRequest(endpoint, formData) {
        const url = `${this.baseURL}${endpoint}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            if (!response.ok) {
                // Create error with status code for better handling
                const error = new Error(data.message || `HTTP error! status: ${response.status}`);
                error.status = response.status;
                error.data = data;
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Upload Error:', error);
            throw error;
        }
    }

    // Auth endpoints
    async register(userData) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async login(credentials) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

    async logout() {
        return this.request('/auth/logout', {
            method: 'POST',
        });
    }

    async refreshToken() {
        return this.request('/auth/refresh-token', {
            method: 'POST',
        });
    }

    // User endpoints
    async getCurrentUser() {
        return this.request('/user/profile');
    }

    async getUserIssues() {
        return this.request('/user/issues');
    }

    async updateUserProfile(userData) {
        return this.request('/user/profile', {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
    }

    // Issue endpoints
    async createIssue(formData) {
        return this.uploadRequest('/issue/postIssue', formData);
    }

    async getAllIssues() {
        return this.request('/issue/getAllIssue');
    }

    async getIssueById(issueId) {
        return this.request(`/issue/getIssue/${issueId}`);
    }

    async updateIssueStatus(issueId, status) {
        return this.request(`/issue/updateStatus/${issueId}`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        });
    }

    async getIssuesByPriority() {
        return this.request('/issue/getIssuesByPriority');
    }

    async getAdminStats() {
        return this.request('/issue/adminStats');
    }

    async reportIssueAsFake(issueId) {
        return this.request(`/issue/reportAsFake/${issueId}`, {
            method: 'PUT',
        });
    }
}

export const apiService = new ApiService();
