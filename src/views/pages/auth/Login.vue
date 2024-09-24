<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { NotificationService } from '../../../service/NotificationService';
import { useAuthStore } from '../../../store/authStore';

const checked = ref(false);
const authStore = useAuthStore();
const router = useRouter();
const userEmail = ref('');
const password = ref('');

const notificationService = new NotificationService();

watch(() => authStore.error, (newError) => {
            if (newError) {
                notificationService.error(newError, 'Erro de Login');
            }
        });

const onSubmit = async () => {
       if (authStore.isLoggedIn && userEmail.value !== authStore.loggedUserEmail) {
        authStore.logout();
        localStorage.removeItem('token');
        return;
    }

    if (!authStore.isLoggedIn) {
        await authStore.login(userEmail.value, password.value);

        if (authStore.isSingleTenant) {
            await authStore.obterToken(userEmail.value, password.value);
            router.push('/app');
        }
        authStore.setUser(userEmail.value);
        return;
    }

    authStore.setUser(userEmail.value);
    if (authStore.selectedTenant) {
        await authStore.obterToken(userEmail.value, password.value);
        router.push('/app');
    }
};

const onSelectTenant = (tentant) => {
    authStore.setSelectedTenant(tentant);
};
</script>

<template>
    <Toast />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.2rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 100%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8 items-center justify-center">
                        <div class="w-full flex flex-col items-center justify-center mb-8">
                            <img src="../../../assets/images/logotipo.png" width="150px" />
                        </div>
                        <div class="w-96"></div>
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Bem vindo ao eSistem!</div>
                        <span class="text-muted-color font-medium">Autentique-se para continuar</span>
                    </div>
                    <div>
                        <form @submit.prevent="onSubmit">
                            <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                            <InputText pt:root:id="email1" type="text" placeholder="Endereço de email" class="w-full md:w-[30rem] mb-3" v-model="userEmail" :invalid="authStore.wrongUserNameOrPassword" />

                            <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Senha</label>
                            <Password pt:pcInput:root:id="password1" v-model="password" placeholder="Senha" :toggleMask="true" class="mb-4" fluid :feedback="false" :invalid="authStore.wrongUserNameOrPassword"></Password>
                            <p v-if="authStore.wrongUserNameOrPassword" class="text-red-500">Usuário ou Senha inválidos.</p>
                            <template v-if="!authStore.isLoggedIn">
                                <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                                    <div class="flex items-center">
                                        <Checkbox v-model="checked" pt:input:id="rememberme1" binary class="mr-2"></Checkbox>
                                        <label for="rememberme1">Lembre-me</label>
                                    </div>
                                    <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Esqueceu a senha?</span>
                                </div>
                            </template>
                            <template v-else>
                                <label for="select1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Selecione a empresa</label>
                                <Select pt:root:id="select1" v-model="authStore.selectedTenant" :options="authStore.user.tenants" optionLabel="name" placeholder="Empresa" class="mb-8" @change="onSelectTenant(authStore.selectedTenant)" fluid />
                            </template>
                            <Button :label="authStore.isLoggedIn ? 'Continuar' : 'Entrar'" class="w-full" type="submit" :loading="authStore.loading"></Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
