<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import { useAuthStore } from '@/store/authStore.ts';
import { computed, ref } from 'vue';

const email = ref('');
const password = ref('');
const checked = ref(false);
const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);

const onSubmit = async () => {
    await authStore.login(email.value, password.value);
};
</script>

<template>
    <FloatingConfigurator />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8 items-center justify-center">
                        <div class="w-full flex flex-col items-center justify-center mb-8">
                            <img src="../../../assets/images/logotipo.png" width="100" />
                        </div>
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Bem vindo ao eSistem!</div>
                        <span class="text-muted-color font-medium">Autentique-se para continuar</span>
                    </div>

                    <div>
                        <form @submit.prevent="onSubmit">
                            <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                            <InputText pt:root:id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" v-model="email" value="admin@root.com" />

                            <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Senha</label>
                            <Password pt:pcInput:root:id="password1" v-model="password" placeholder="Senha" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                            <template v-if="isLoggedIn">
                                <div class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Selecione a empresa</div>
                                <Select v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Empresa" class="mb-8" fluid />
                            </template>

                            <template v-else>
                                <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                                    <div class="flex items-center">
                                        <Checkbox v-model="checked" pt:input:id="rememberme1" binary class="mr-2"></Checkbox>
                                        <label for="rememberme1">Lembre-me</label>
                                    </div>
                                    <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Esqueceu a senha?</span>
                                </div>
                            </template>

                            <Button label="Sign In" class="w-full" type="submit"></Button>
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
