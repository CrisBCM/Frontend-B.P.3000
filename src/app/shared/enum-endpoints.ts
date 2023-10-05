export enum EnumEndpoints {
    registroPath = "http://localhost:8080/api/v1/auth/registrar",
    inicioSesionPath = "http://localhost:8080/api/v1/auth/iniciar-sesion",
    getPersona = "http://localhost:8080/persona/obtener",
    añadirComida = "http://localhost:8080/v3/comida/añadir",
    eliminarComida = "http://localhost:8080/v3/comida/eliminar",
    editarComida = "http://localhost:8080/v3/comida/editar",
    obtenerPosts = "http://localhost:8080/publicacion/todas",
    publicar = "http://localhost:8080/publicacion/añadir",
    editarPublicacion = "http://localhost:8080/publicacion/editar",
    eliminarPublicacionn ="http://localhost:8080/publicacion/eliminar",
    enviarComentario = "http://localhost:8080/comentario/añadir",
    cambiarAvatar = "http://localhost:8080/persona/avatar/cambiar",
    añadirRespuesta = "http://localhost:8080/respuesta/añadir",
    eliminarComentario = "http://localhost:8080/comentario/eliminar",
    eliminarRespuesta = "http://localhost:8080/respuesta/eliminar",
    editarRespuesta = "http://localhost:8080/respuesta/editar",
    editarComentario = "http://localhost:8080/comentario/editar",
    meGusta = "http://localhost:8080/comentario/megusta",
    noMeGusta = "http://localhost:8080/comentario/nomegusta",
    meGustaRespuesta = "http://localhost:8080/respuesta/megusta",
    noMeGustaRespuesta = "http://localhost:8080/respuesta/nomegusta",
    perfilUsuario = "http://localhost:8080/persona/usuario",
    publicacionVotarMeGusta = "http://localhost:8080/publicacion/megusta",
    publicacionVotarNoMeGusta = "http://localhost:8080/publicacion/nomegusta",
    crearCategoria = "http://localhost:8080/categoria/crear",
    obtenerCategorias = "http://localhost:8080/categoria/todas",
    eliminarCategoria = "http://localhost:8080/categoria/eliminar",
    editarCategoria = "http://localhost:8080/categoria/editar"
}
