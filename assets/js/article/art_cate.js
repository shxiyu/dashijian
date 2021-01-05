/*
 * @Author: XiYu
 * @Date: 2021-01-04 11:42:13
 * @LastEditors: XiYu
 * @LastEditTime: 2021-01-04 15:09:57
 * @Description: ...
 */
$(function () {
    let layer = layui.layer;
    let form = layui.form;

    //获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                lethtmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
            }
        })
    }

    //为添加类别按钮绑定点击事件
    let indexAdd = null;
    $('#btnAndCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html(),
        })
    })

    //通过代理的形式，为form-add表单绑定submit事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败');
                }
                layer.msg('新增分类成功');
                //根据索引关闭弹出层
                layer.close(indexAdd);
            }
        })
    })

    //通过代理的形式，为btn-edit按钮绑定点击事件
    let indexEdit = null;
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html(),
        })
    })

    let id = $(this).attr('data-id');
    //发起请求获取对应分类的数据
    $.ajax({
        type: 'GET',
        url: '/my/article/cates' + id,
        success: function (res) {
            form.val('form-edit', res.data);
        }
    })

    //
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败');
                }
                layer.msg('更新分类数据成功');
                layer.close(indexEdit);
                initArtCateList();
            }
        })
    })

    //
    $('tbody').on('click', '.btn-delete', function () {
        let id = $(this).attr('data-id');
        //
        layer.confirm('is not?', { icon: 3, title: '提示' }, function (index) {
            //do something

            layer.close(index);
        });
    })
})
