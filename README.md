# RIA

## Diseño del sistema y descripción de tecnologías:
  
  La aplicación se desarrolló como plugin de WordPress
  Se utilizaron las siguientes tecnologías:
- PHP - Requerido por Wordpress para funcionar
- MySQL - Requerido por Wordpress para funcionar
- HTML
- Javascript
- WordPress
- CSS
- Bootstrap

Para la carga de contenido, se utilizaron las siguientes APIs Externas:
1) https://calendarific.com/api/v2/holidays Api de donde se obtiene la información de los días feriados según país y año.
2) https://restcountries.eu Obtenemos información del País seleccionado en base al código de referencia del país
3) http://www.mapquestapi.com/geocoding/v1 Convierte coordenadas a código de País
   


## Manual de configuración y uso:

La aplicación fue desarrollada como un plugin de Wordpress, por lo que primero debe tenerse una instalación de Wordpress (ver [Guía de Instalación de Wordpress](https://codex.wordpress.org/es:Instalando_WordPress)).

Se debe descargar el código fuente del plugin en un zip, y subirlo a tu instalación de Wordpress desde el Panel de Administrador de WordPress -> Plugins -> Subir Nuevo -> Seleccionar el archivo zip e instalar. En cuanto Wordpress lo indique, se le da click en Activar Plugin.

Para poder configurar la vista en una página/post de WordPress, se agrega el shortcode [ria-map] donde desee mostrarse la aplicación.
Luego para visualizar la página se accede desde el enlace que Wordpress te muestra como información de la página/post.
