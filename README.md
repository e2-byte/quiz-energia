# Reto Energético — Quiz web

Aplicación educativa sobre electricidad y consumo energético. Incluye 10 preguntas, calificación automática, registro de múltiples participantes en el mismo navegador, dashboard estadístico, gráficas y exportación CSV.

## Ejecutar en VS Code

1. Descomprime el ZIP y abre la carpeta `quiz_energia` en Visual Studio Code.
2. Recomendado: instala la extensión **Live Server** en VS Code.
3. Haz clic derecho en `index.html` y selecciona **Open with Live Server**.
4. Ingresa un nombre y completa el quiz. Para registrar a otra persona, pulsa **Registrar otra persona**.
5. Abre **Estadísticas del grupo** para ver los indicadores y exportar los resultados.

También puedes abrir `index.html` directamente en un navegador moderno. Se requiere conexión a Internet para cargar Chart.js desde CDN y la fuente web; la lógica básica del quiz sí está en los archivos locales.

## Qué incluye

- 10 preguntas de opción múltiple con explicaciones.
- Puntuación automática sobre 100%.
- Umbral ilustrativo de aprobación: 60%.
- Promedio, tasa de aprobación, máximo y cantidad de participantes.
- Gráfica de distribución de calificaciones.
- Porcentaje de aciertos por pregunta.
- Tabla de resultados y exportación CSV compatible con Excel.
- Diseño adaptable a móvil y escritorio.

## Importante sobre los datos

Esta versión guarda los resultados en `localStorage` del navegador. **Solo reúne a las personas que usen el mismo navegador/perfil y dispositivo.** No es una base de datos compartida por Internet. Borrar los datos del navegador o cambiar de dispositivo puede hacer que los resultados no estén disponibles. Exporta el CSV con regularidad.

Para que participantes desde teléfonos y computadoras diferentes alimenten una estadística común, hay que conectar una base de datos alojada (por ejemplo Supabase) y configurar permisos de seguridad. El frontend se puede publicar en Cloudflare Pages con una dirección gratuita `*.pages.dev`; revisa los límites y condiciones vigentes de los planes gratuitos. Los proveedores no garantizan servicio gratuito para siempre. En el plan gratuito de Supabase los proyectos pueden pausarse por inactividad, así que revisa su política actual antes de depender de él para una evaluación continua.

## Publicar el frontend gratuitamente

1. Crea un repositorio en GitHub y sube estos archivos.
2. En Cloudflare, abre Workers & Pages y crea una aplicación Pages conectada al repositorio.
3. Selecciona la rama principal y deja vacíos el comando de compilación y el directorio de salida si te lo permite para este sitio estático; de lo contrario, usa la carpeta raíz del proyecto como directorio de salida.
4. Publica y elige el subdominio disponible `nombre.pages.dev`.

Enlaces oficiales:
- Cloudflare Pages: https://pages.cloudflare.com/
- Guía de publicación: https://developers.cloudflare.com/pages/get-started/
- Límites: https://developers.cloudflare.com/pages/platform/limits/
- Supabase: https://supabase.com/pricing

## Personalizar las preguntas

Abre `app.js` y edita el arreglo `QUESTIONS`. Cada pregunta contiene:
- `category`: categoría.
- `q`: enunciado.
- `options`: cuatro opciones.
- `answer`: índice de la respuesta correcta, empezando en cero.
- `explanation`: explicación mostrada al responder.

Si cambias la cantidad de preguntas, la calificación se adapta automáticamente.
