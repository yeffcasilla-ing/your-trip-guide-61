# Pathfinder Pro

PROMPT MAESTRO — APP COMPLETA DE NAVEGACIÓN GPS

Quiero desarrollar una aplicación móvil profesional de navegación GPS para Android y iOS.

La aplicación debe tener como referencia funcional las principales capacidades de aplicaciones como Google Maps, Waze y otras aplicaciones modernas de navegación, pero debe tener identidad visual, arquitectura y código propios.

NO copies interfaces, logos, nombres, diseños propietarios ni código de otras aplicaciones.

REGLA PRINCIPAL

Antes de comenzar:

Analiza todo el proyecto existente.

Identifica la tecnología utilizada.

Identifica todas las funcionalidades existentes.

Identifica las APIs existentes.

Identifica la base de datos.

Identifica el sistema GPS.

Identifica el sistema de mapas.

Identifica las pantallas existentes.

MUY IMPORTANTE

NO eliminar funcionalidades existentes.

NO reconstruir innecesariamente el proyecto.

NO reemplazar código funcional sin necesidad.

Las nuevas funcionalidades deben integrarse con las existentes.

Antes de cambios importantes:

git status
git add .
git commit -m "checkpoint: stable version before major development"
git push


1. ARQUITECTURA GENERAL

Crear una aplicación modular y escalable.

Separar:

UI
│
├── Maps
├── Navigation
├── Search
├── GPS
├── Trips
├── Places
├── Voice
├── Traffic
├── Settings
└── Profile

Backend
│
├── Authentication
├── Users
├── Trips
├── History
└── Preferences

External Services
│
├── Maps
├── Search
├── Routing
├── Traffic
└── Voice


La base de datos debe almacenar principalmente información propia del usuario.

NO convertir la base de datos en una copia de mapas públicos.

2. PANTALLA PRINCIPAL

Crear una pantalla principal centrada en el mapa.

Debe mostrar:

Posición actual.

Mapa.

Ruta actual.

Tráfico cuando esté disponible.

Destino.

Controles esenciales.

Barra de búsqueda.

Diseño minimalista.

3. BARRA DE BÚSQUEDA

Permitir buscar:

Direcciones.

Calles.

Ciudades.

Negocios.

Restaurantes.

Gasolineras.

Hospitales.

Bancos.

Farmacias.

Hoteles.

Estacionamientos.

Talleres.

Lugares turísticos.

Cualquier lugar disponible mediante el proveedor geográfico.

La búsqueda debe utilizar Internet/API.

NO guardar todos estos lugares en nuestra base de datos.

Implementar:

Autocompletado.

Debounce.

Resultados cercanos.

Historial de búsqueda.

Cancelación de solicitudes anteriores.

Caché temporal.

4. DETALLE DEL LUGAR

Al seleccionar un lugar mostrar cuando la información esté disponible:

Nombre.

Dirección.

Distancia.

Horario.

Teléfono.

Sitio web.

Calificación.

Fotografías.

Información relevante.

Botón "Cómo llegar".

Botón "Guardar".

Botón "Compartir".

No inventar información que el proveedor no entregue.

5. NAVEGACIÓN GPS

Implementar navegación giro a giro.

Mostrar:

Próximo giro.

Distancia al giro.

Tiempo restante.

Distancia restante.

ETA.

Velocidad.

Ruta.

Destino.

Progreso del viaje.

Utilizar GPS real.

El vehículo debe moverse suavemente.

6. RUTAS

Permitir:

Ruta más rápida.

Ruta más corta cuando esté disponible.

Rutas alternativas.

Evitar peajes.

Evitar autopistas.

Preferencias de ruta.

Múltiples destinos/paradas.

Reordenamiento de paradas.

El sistema debe permitir agregar varios destinos.

Ejemplo:

Origen
 ↓
Parada 1
 ↓
Parada 2
 ↓
Parada 3
 ↓
Destino


7. TRÁFICO

Cuando el proveedor lo permita:

Mostrar:

Tráfico.

Congestión.

Accidentes/incidentes disponibles.

Carreteras lentas.

Retrasos.

Cambios de ETA.

Utilizar información actualizada del proveedor.

NO inventar tráfico.

8. RECÁLCULO AUTOMÁTICO

Detectar:

Desviación de ruta.

Cambio importante de recorrido.

Necesidad de recalcular.

Recalcular automáticamente.

NO recalcular en cada actualización GPS.

9. TIPOS DE VEHÍCULO

Permitir:

🚗 Automóvil
🏍️ Motocicleta
🚚 Camión
🚌 Autobús
🚐 Vehículo pesado
🚲 Bicicleta
🚶 Peatón


El tipo de vehículo debe influir en la selección de rutas cuando el proveedor proporcione restricciones compatibles.

10. RESTRICCIONES DE VEHÍCULO

Preparar soporte para:

Peso.

Altura.

Ancho.

Longitud.

Tipo de carretera.

Peajes.

Restricciones de camiones.

Restricciones de motocicletas.

Restricciones temporales.

IMPORTANTE:

NO inventar restricciones.

Si una API no proporciona una restricción, no afirmar que existe.

Crear un módulo:

VehicleRestrictionEngine


11. MOTOCICLETAS

La aplicación debe contemplar navegación específica para motocicletas cuando el proveedor lo soporte.

Preparar:

Rutas para dos ruedas.

Preferencias de motocicleta.

Restricciones específicas.

La disponibilidad de estas funciones depende de la cobertura del proveedor y la región.

12. CAMIONES

Preparar soporte para:

Altura máxima.

Peso máximo.

Ancho.

Longitud.

Restricciones de vehículos pesados.

Si los datos reales no están disponibles mediante la API:

NO inventarlos.

13. NAVEGACIÓN POR VOZ

Agregar navegación por voz mediante API externa.

Crear:

VoiceProvider


Debe poder utilizar:

Español.

Inglés.

Otros idiomas posteriormente.

Instrucciones:

Gira a la derecha.

Continúa durante 500 metros.

Recalculando ruta.

Has llegado a tu destino.

No generar audio en cada actualización GPS.

14. MAPAS

Crear arquitectura:

MapProvider


Permitir integrar:

Google Maps.

Otros proveedores compatibles posteriormente.

No acoplar toda la aplicación a un único proveedor.

El Navigation SDK de Google permite integrar navegación giro a giro, personalizar UI, rutas y elementos del mapa, además de utilizar diferentes modos de transporte.

15. ESTILOS DE MAPA

Permitir:

Claro

Mapa limpio y luminoso.

Oscuro

Mapa oscuro para conducción nocturna.

Automático

Cambiar según el sistema.

16. LUGARES GUARDADOS

Crear sección:

Guardados

Permitir:

Casa.

Trabajo.

Favoritos.

Crear listas.

Guardar lugares.

Eliminar lugares.

Editar lugares.

17. VIAJES GUARDADOS

Crear:

Mis viajes

Permitir guardar rutas frecuentes.

Ejemplo:

Casa → Trabajo
Casa → Universidad
Trabajo → Casa


Google Maps actualmente permite guardar viajes frecuentes y acceder rápidamente a ellos.

18. HISTORIAL

Crear:

Historial de viajes

Mostrar:

Fecha.

Hora.

Origen.

Destino.

Distancia.

Duración.

Ruta recorrida.

Permitir:

Ver.

Eliminar.

Repetir ruta.

Compartir.

19. TIMELINE / RECORRIDOS

Crear una sección opcional:

Mis recorridos

Mostrar visualmente los recorridos realizados.

Debe poder:

Activarse/desactivarse.

Eliminar datos.

Consultar recorridos.

Ver fechas.

La función debe respetar la privacidad del usuario.

20. COMPARTIR UBICACIÓN

Preparar función:

Compartir ubicación

Permitir compartir:

Ubicación actual.

Destino.

Progreso del viaje.

No implementar seguimiento permanente sin consentimiento explícito.

21. COMPARTIR VIAJE

Durante una navegación:

Compartir viaje

Enviar un enlace que permita consultar, cuando el backend lo soporte:

Ubicación.

Destino.

ETA.

Estado del viaje.

El usuario debe poder detener el uso compartido.

22. EXPLORAR

Crear pestaña:

Explorar

Mostrar categorías cercanas:

Restaurantes.

Gasolineras.

Hospitales.

Farmacias.

Bancos.

Supermercados.

Hoteles.

Talleres.

Estacionamientos.

Lugares turísticos.

Los resultados deben venir de servicios geográficos externos.

23. TRÁFICO / INCIDENTES

Crear una sección visual para información disponible sobre:

Accidentes.

Obras.

Carreteras cerradas.

Congestión.

Incidentes.

Solo mostrar información proporcionada por fuentes compatibles.

24. MAPA INTERACTIVO

Permitir:

Zoom.

Rotación.

Inclinación.

Centrar ubicación.

Seguir vehículo.

Vista norte.

Vista 3D si el proveedor lo permite.

25. VISTA DE NAVEGACIÓN

Crear una vista especializada para conducir.

Elementos:

Próximo giro
       ↓
      MAPA
       ↓
Tiempo | Distancia | ETA


Debe minimizar distracciones.

26. VELOCIDAD

Mostrar velocímetro cuando exista información suficiente.

Permitir configurar:

km/h.

mph.

Preparar alertas de velocidad cuando los datos de límite estén disponibles.

27. DESTINOS MÚLTIPLES

Permitir:

Agregar paradas.

Eliminar paradas.

Reordenar.

Editar.

Recalcular.

28. BÚSQUEDAS RECIENTES

Mostrar:

Recientes

Guardar localmente o en la cuenta únicamente la información necesaria.

Permitir borrar historial.

29. FAVORITOS

Permitir:

Guardar lugar.

Editar.

Eliminar.

Crear categorías.

Ejemplo:

Casa
Trabajo
Familia
Clientes
Favoritos


30. NOTIFICACIONES

Preparar sistema para:

Llegada.

Desvío.

Cambio de ruta.

Incidentes importantes.

Compartir viaje.

Alertas relevantes.

No enviar notificaciones innecesarias.

31. PERFIL

Crear pestaña:

Perfil

Contendrá:

Información del usuario.

Vehículo.

Preferencias.

Lugares guardados.

Viajes.

Privacidad.

Configuración.

32. CONFIGURACIÓN

Crear:

Apariencia

Claro.

Oscuro.

Automático.

Navegación

Voz.

Volumen.

Idioma.

Preferencia de ruta.

Vehículo

Tipo.

Preferencias.

Mapa

Proveedor.

Estilo.

Vista.

Privacidad

Historial.

Ubicación.

Compartir ubicación.

Notificaciones

Activar/desactivar.

33. PRIVACIDAD

El usuario debe controlar:

Historial.

Ubicación.

Compartir ubicación.

Datos almacenados.

Permitir eliminar sus datos.

No almacenar información geográfica pública innecesariamente.

34. MODO OFFLINE

Preparar arquitectura para mapas offline.

Si se implementa:

Permitir seleccionar área.

Descargar datos permitidos por el proveedor.

Mostrar almacenamiento utilizado.

Eliminar mapas descargados.

No implementar una copia ilegal o no autorizada de datos de mapas.

35. SIN CONEXIÓN

Cuando no haya Internet:

Mantener GPS.

Mantener interfaz.

Mostrar estado offline.

Mantener datos locales disponibles.

No perder el viaje actual.

Sincronizar cuando vuelva la conexión.

36. RENDIMIENTO

Optimizar:

GPS.

Mapas.

Renderizado.

Animaciones.

Red.

Batería.

Memoria.

Utilizar carga por viewport.

No cargar todo el mundo.

37. DISEÑO

Crear dos temas completos.

☀️ CLARO

Minimalista.

🌙 OSCURO

Minimalista.

Usar:

Espacios amplios.

Iconos consistentes.

Pocas tarjetas.

Pocos botones.

Tipografía clara.

Animaciones rápidas.

La interfaz debe sentirse como una aplicación profesional de navegación.

38. NAVEGACIÓN INFERIOR

Crear una navegación sencilla:

Mapa
Explorar
Guardados
Viajes
Perfil


No crear pestañas innecesarias.

39. ESTADO DEL VIAJE

Durante un viaje mostrar:

Ruta activa

ETA
Tiempo restante
Distancia
Próxima maniobra
Velocidad


40. BACKEND

Mantener separado:

Datos externos
     ↓
APIs de mapas
APIs de rutas
APIs de lugares
APIs de tráfico

Datos propios
     ↓
Usuarios
Viajes
Historial
Preferencias
Favoritos


41. API KEYS

Nunca colocar claves directamente en el código.

Utilizar:

.env
Secret Manager
Variables de entorno


Nunca subir secretos a Git.

42. GOOGLE CLOUD

Preparar el backend para Google Cloud si es el proveedor seleccionado.

Separar:

API.

Base de datos.

Autenticación.

Servicios.

43. CONTROL DE VERSIONES

Utilizar Git.

Crear ramas:

feature/search
feature/navigation
feature/vehicles
feature/voice
feature/traffic
feature/saved-places
feature/trips
feature/profile
feature/themes


Cada función debe probarse antes de fusionarse.

44. PRUEBAS

Crear pruebas para:

GPS.

Búsqueda.

Rutas.

Navegación.

Recalculo.

Vehículos.

Voz.

Historial.

Guardados.

Compartir ubicación.

Temas.

Offline.

Backend.

Autenticación.

También realizar pruebas de regresión para garantizar que las funciones existentes no se rompan.

45. IMPLEMENTACIÓN POR ETAPAS

NO intentes construir todo de una sola vez.

Trabaja así:

FASE 1

Auditoría del proyecto.

FASE 2

Arquitectura y navegación de pantallas.

FASE 3

Mapa + búsqueda.

FASE 4

GPS + navegación.

FASE 5

Rutas + alternativas.

FASE 6

Vehículos + restricciones.

FASE 7

Voz.

FASE 8

Tráfico.

FASE 9

Explorar + lugares.

FASE 10

Guardados + favoritos.

FASE 11

Viajes + historial.

FASE 12

Perfil + configuración.

FASE 13

Compartir ubicación/viaje.

FASE 14

Temas claro/oscuro.

FASE 15

Optimización.

FASE 16

Pruebas.

FASE 17

Build Android.

FASE 18

Build iOS.

46. REGLA DE NO REGRESIÓN

Después de cada fase:

Ejecutar aplicación.

Probar funciones nuevas.

Probar funciones anteriores.

Corregir errores.

Crear commit.

Hacer push.

Nunca continuar con una nueva fase si la anterior rompió funcionalidades existentes.

47. RESULTADO FINAL

Quiero una aplicación de navegación completa con:

✓ GPS en tiempo real
✓ Navegación giro a giro
✓ Búsqueda de lugares
✓ Rutas óptimas
✓ Rutas alternativas
✓ Tráfico cuando esté disponible
✓ Recalculo automático
✓ Navegación por voz
✓ Diferentes vehículos
✓ Restricciones por vehículo
✓ Múltiples destinos
✓ Lugares guardados
✓ Favoritos
✓ Historial
✓ Viajes frecuentes
✓ Recorridos
✓ Compartir ubicación
✓ Compartir viaje
✓ Explorar lugares cercanos
✓ Velocímetro
✓ Preferencias de ruta
✓ Temas claro/oscuro
✓ Configuración completa
✓ Perfil
✓ Privacidad
✓ Soporte Android
✓ Soporte iOS
✓ Arquitectura multiproveedor
✓ Backend escalable
✓ Base de datos únicamente para datos propios
✓ Optimización de red
✓ Optimización GPS
✓ Optimización de batería

REGLA FINAL Y MÁS IMPORTANTE

NO destruyas lo que ya funciona.

La aplicación debe evolucionar:

PROYECTO ACTUAL
      ↓
ANALIZAR
      ↓
CONSERVAR
      ↓
AMPLIAR
      ↓
PROBAR
      ↓
OPTIMIZAR
      ↓
COMMIT
      ↓
PUSH


No quiero una aplicación de demostración.

Quiero una aplicación funcional y escalable.

Cuando una función dependa de una API externa, verifica primero su documentación, cobertura, límites y precio actual.

No inventes APIs, datos, restricciones, tráfico ni funcionalidades que el proveedor no soporte.

Comienza analizando el proyecto actual y crea primero un inventario de las funcionalidades existentes antes de modificar código.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://your-trip-guide-61.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f34611ff-77b6-47d9-bdc5-c3deb63c1f44).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
