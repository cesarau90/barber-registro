/**
 * config.js — Configuración central de Barber Registro.
 *
 * Detecta automáticamente si estamos en local o en producción (Render).
 * En local usa localhost:3001, en producción usa rutas relativas /api
 * para que funcione con el mismo dominio de Render sin CORS.
 */

const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3001/api'
    : '/api';

export const config = {
    apiURL: API_URL,
    emailJS: {
        serviceId: 'service_wn05ymp',
        publicKey: 'qFJurRildjWCafr5d',
        templateReserva: 'template_ltyvhuj',
        templateRegistro: 'template_o3nrsar'
    }
};

/**
 * Módulo auth — Manejo de sesión basado en JWT.
 *
 * Usa sessionStorage en vez de localStorage porque la sesión se limpia
 * al cerrar la pestaña, reduciendo el riesgo de que un token robado
 * persista en el navegador indefinidamente.
 */
export const auth = {
    guardarSesion(token, data, role) {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userData', JSON.stringify(data));
        sessionStorage.setItem('role', role);
    },
    getToken()    { return sessionStorage.getItem('token'); },
    getRole()     { return sessionStorage.getItem('role'); },
    getUserData() { const d = sessionStorage.getItem('userData'); return d ? JSON.parse(d) : null; },
    estaLogueado(){ return !!this.getToken(); },
    logout() {
        const role = this.getRole();
        sessionStorage.clear();
        window.location.href = role === 'admin' ? 'admin.html' : 'login.html';
    },
    headers() {
        return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.getToken()}` };
    },
    async verificar() {
        if (!this.getToken()) return false;
        try {
            const r = await fetch(`${config.apiURL}/auth/verificar`, {
                headers: { 'Authorization': `Bearer ${this.getToken()}` }
            });
            if (!r.ok) { this.logout(); return false; }
            const d = await r.json();
            if (d.barberia) sessionStorage.setItem('userData', JSON.stringify(d.barberia));
            if (d.admin)    sessionStorage.setItem('userData', JSON.stringify(d.admin));
            return true;
        } catch { return false; }
    }
};

