export enum EnumEndpoints {
    registroPath = "http://localhost:8081/api/v1/auth/registrar",
    inicioSesionPath = "http://localhost:8081/api/v1/auth/iniciar-sesion",
    getPersona = "http://localhost:8081/persona/obtener",
    añadirComida = "http://localhost:8081/v3/comida/añadir",
    eliminarComida = "http://localhost:8081/v3/comida/eliminar",
    editarComida = "http://localhost:8081/v3/comida/editar",
    obtenerPosts = "http://localhost:8081/publicacion/todas",
    publicar = "http://localhost:8081/publicacion/añadir",
    editarPublicacion = "http://localhost:8081/publicacion/editar",
    eliminarPublicacionn ="http://localhost:8081/publicacion/eliminar",
    enviarComentario = "http://localhost:8081/comentario/añadir",
    cambiarAvatar = "http://localhost:8081/persona/avatar/cambiar",
    añadirRespuesta = "http://localhost:8081/respuesta/añadir",
    eliminarComentario = "http://localhost:8081/comentario/eliminar",
    eliminarRespuesta = "http://localhost:8081/respuesta/eliminar",
    editarRespuesta = "http://localhost:8081/respuesta/editar",
    editarComentario = "http://localhost:8081/comentario/editar",
    meGusta = "http://localhost:8081/comentario/megusta",
    noMeGusta = "http://localhost:8081/comentario/nomegusta",
    meGustaRespuesta = "http://localhost:8081/respuesta/megusta",
    noMeGustaRespuesta = "http://localhost:8081/respuesta/nomegusta",
    perfilUsuario = "http://localhost:8081/persona/usuario",
    publicacionVotarMeGusta = "http://localhost:8081/publicacion/megusta",
    publicacionVotarNoMeGusta = "http://localhost:8081/publicacion/nomegusta",
    crearCategoria = "http://localhost:8081/categoria/crear",
    obtenerCategorias = "http://localhost:8081/categoria/todas",
    eliminarCategoria = "http://localhost:8081/categoria/eliminar",
    editarCategoria = "http://localhost:8081/categoria/editar",
    obtenerResumenCategorias = "http://localhost:8081/categoria/resumen",
    cambiarEstadoCategoria = "http://localhost:8081/categoria/cambiarestado",
    obtenerPublicacionesDeCategoria = "http://localhost:8081/categoria"
}
