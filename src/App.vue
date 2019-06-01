<template>
    <section id = "app">
        <FCarsousel class = "lunbo">
            <img src="../img/lunbo1.jpg" alt="">
            <img src="../img/lunbo2.png" alt="">
            <img src="../img/lunbo3.jpg" alt="">
            <img src="../img/lunbo4.jpg" alt="">
        </FCarsousel>
    </section>
</template>
<script>
import FCarsousel from './components/FCarsousel.vue'
import Test from './components/test.vue'


export default {
    components:{
        FCarsousel,
        Test
    },
    mounted(){
        console.log("Vue工程启动成功")
    }
}
</script>
<style  scoped>
    #app {
        height:100%;
        width:100%;
    }
    .lunbo {
        height:20%;
    }
</style>


