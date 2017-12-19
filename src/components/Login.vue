<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <h1>Login Form</h1>
                <p v-if="this.error" class="danger">{{error}}</p>
                <form @submit.prevent="login(user)">
                    <div class="text-left">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email" placeholder="Your email" v-model="user.email">
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="Your password" v-model="user.password">
                        </div>
                    </div>

                    <div class="text-center">
                        <button class="btn btn-primary">Login</button>
                    
                        <router-link class="btn btn-default" :to="{ name: 'Register' }">
                            Register
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

 
</script>