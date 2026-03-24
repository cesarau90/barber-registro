/**
* config.js — Configuración central de Barber Registro.
*
* Este archivo centraliza:
* - La URL de la API (cambiarla según entorno: local, ngrok, producción)
* - Credenciales de EmailJS para notificaciones por correo
* - Módulo `auth` para manejo de sesión (token JWT en sessionStorage)
*
* DESARROLLO LOCAL:
*   const API_URL = 'http://localhost:3001/api';
*
* CON NGROK (para acceso público temporal):
*   1. Ejecuta: ngrok http 3001
*   2. Copia la URL generada y reemplaza abajo:
*      const API_URL = 'https://TU-SUBDOMINIO.ngrok-free.app/api';
*
* NOTA: El frontend (Live Server en puerto 5500) NO necesita ngrok
* si solo lo abres desde la misma computadora. Para compartir a otros
* en tu red local usa: http://TU-IP-LOCAL:5500/frontend/barberia.html?codigo=XXXX
*/
 
/* Detecta automáticamente si estamos en local o en producción (Render).
  En local usa localhost:3001, en producción usa rutas relativas /api
  para que funcione con el mismo dominio de Render sin CORS. */
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
   ? 'http://localhost:3001/api'
   : '/api';
