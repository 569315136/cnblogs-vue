<template>
    <div>
        <div class="mui-content">
            <div style="position: relative;">
                <div id="blogPullrefresh" class="mui-scroll-wrapper">
                    <div class="mui-scroll">
                        <div>
                            <blog v-for="blog in blogList" :blog="blog">
                            </blog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <foot></foot>
        <!--<div class="mui-bar mui-bar-tab">
			<a class="mui-tab-item mui-active" href="#/index">
				<span class="mui-icon-extra mui-icon-extra-dictionary"></span>
				<span class="mui-tab-label">博客</span>
			</a>
			<a class="mui-tab-item" href="#/news">
				<span class="mui-icon-extra mui-icon-extra-new"></span>
				<span class="mui-tab-label">新闻</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-contact">
				<span class="mui-icon-extra mui-icon-extra-peoples"></span>
				<span class="mui-tab-label">聊天室</span>
			</a>
		</div>-->
    </div>
</template>
<script>
    import blog from './blog.vue'
    import foot from '../foot/index.vue'
    import { mapState, mapActions } from 'vuex'
    export default {
        components:{
            blog,
            foot
        },
        computed: {
            ...mapState({
                blogList: state=>state.blog_list.list,
                blogHasMore: state=>state.blog_list.hasMore
            })
        },
        methods: {
            ...mapActions([
                'getBlogs',
                'updateBlogs'
            ])
        },
        mounted: function () {
            let that = this
            $('.mui-content,.mui-scroll-wrapper').height(window.innerHeight-50);
            let blogPullrefresh=mui('#blogPullrefresh')
            blogPullrefresh.pullRefresh({
                up:{
                    height: 50, 
                    auto: true,
                    contentrefresh: '正在加载...',
                    contentnomore: '没有更多数据了',
					callback: function(){
                        that.getBlogs().then(res=>{
                            blogPullrefresh.pullRefresh().endPullupToRefresh(!that.blogHasMore);//参数为true表示没有更多了
                        })
                    }
                },
                down:{
                    height: 50, 
                    auto:false,
					callback: function(){
                        that.updateBlogs().then(res=>{
                            blogPullrefresh.pullRefresh().endPulldownToRefresh();//参数为true表示没有更多了
                            blogPullrefresh.pullRefresh().refresh(true);
                        })
                    }
                }
            })
        }
    }
</script>
<style lang="stylus">
/*.mui-scroll
    padding 10px*/
    
</style>