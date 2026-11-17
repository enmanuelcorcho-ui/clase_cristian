# Taller: Arquitectura modular - Aerolínea

Flujo: `Cliente HTTP → Routes → Controllers → Services → Models → JSON`

## Ejecutar
    npm install
    npm start        # http://localhost:3000/api

## Endpoints (CRUD completo)
| Recurso | Base |
|---|---|
| Pilotos | `/api/pilotos` |
| Aviones | `/api/aviones` |
| Asignaciones | `/api/asignaciones` |

Cada uno: `GET /`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id`.

## Ejemplos (body JSON)
Piloto: `{"nombre":"Ana Ruiz","licencia":"ATP-001","horasVuelo":1200,"estado":"activo"}`
Avión: `{"modelo":"A320","matricula":"HK-1234","capacidadMaxima":180,"fabricante":"Airbus"}`
Asignación: `{"idPiloto":1,"idAvion":1,"fechaVuelo":"2026-12-01","rutaAsignada":"BOG-MDE"}`

## Reglas de negocio (en services/)
- Licencia y matrícula únicas.
- Asignación: el piloto y el avión deben existir (404) y el piloto estar `activo`.
- Ni piloto ni avión pueden tener dos vuelos el mismo día (409).
- No se eliminan pilotos/aviones con asignaciones (409).

## Aislamiento de la persistencia
Solo `src/models/baseModel.js` importa `fs`.
