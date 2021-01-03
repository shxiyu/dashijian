/*
 * @Author: XiYu
 * @Date: 2021-01-03 19:09:22
 * @LastEditors: XiYu
 * @LastEditTime: 2021-01-03 20:20:38
 * @Description:
 */
$(function () {
    //调用 getUserInfo 获取用户基本信息
    getUserInfo();

    let layer = layui.layer;

    //点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //清空本地存储中的 token
            localStorage.removeItem('token');
            //重新跳转到登录页面
            location.href = '/login.html';
            //关闭confirm询问框
            layer.close(index);
        });
    })
})

//获取用户的而基本信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            //调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data);
        },

    })
}

//渲染用户的头像
function renderAvatar(user) {
    //获取用户的名称
    let name = user.nickname || user.username;
    //设置欢迎的文本
    $('#welcome').html('欢迎 ' + name);
    //按需渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide();
        let first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}
