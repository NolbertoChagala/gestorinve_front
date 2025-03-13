<script setup lang="ts">
</script>

<template>
    <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="bg-white w-96 h-96 rounded-2xl shadow-2xl">
            <h1 className="text-center font-bold text-2xl m-5">
                Inicie sesión en su cuenta
            </h1>
            <div className="flex flex-col items-center gap-4 ml-6 mr-6">
                <div className="w-full">
                    <p className="mb-2">Correo electrónico</p>
                    <input
                    type="text" 
                    className="border-2 w-full p-2 rounded-md" />
                </div>
                <div className="w-full">
                    <p className="mb-2">Contraseña</p>
                    <input
                    type="password" 
                    className="border-2 w-full p-2 rounded-md" />
                </div>
                <div className="w-full mt-2">
                    <button className="bg-gray-600 text-white hover:bg-gray-700 rounded-md w-full p-2 cursor-pointer">
                        Iniciar Sesión
                    </button>
                </div>
                <p>
                    ¿No tienes una cuenta? <a className="hover:text-blue-600" href="#">Regístrate</a>
                </p>
            </div>
        </div>
    </div>
</template>