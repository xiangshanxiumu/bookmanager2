$(function(){
  //初始化数据列表
  function initList(){
  	$.ajax({
  		type:"get",
  		url:"/books",
  		dataType:"json",
  		success:function(data){
            //console.log(data);
            //渲染数据列表
            var html = template('indexTpl',{list:data});
            $('#dataList').html(html);
            //操作DOM
            $('#dataList').find("tr").each(function(index,element){
               var td = $(element).find("td:eq(5)");
               var id = $(element).find("td:eq(0)").text();
               //绑定编辑图书单击事件
               td.find("a:eq(0)").click(function(){
                  editBook(id);
               });
               //绑定删除图书的单击事件
               td.find("a:eq(1)").click(function(){
                  deleteBook(id);
               });
               //绑定添加图书信息事件
               addBook();
               //重置表单
               //$("#addBookFrom").get(0).reset();
               //$("#addBookFrom").find("input[type=hidden]").val("");
            });
  		}
  	});
  }
  initList();
//编辑图书信息
  function editBook(id){
    var form = $("#addBookFrom");
  	//根据id查询最新数据
  	$.ajax({
  		type:"get",
  		url:"/books/book/"+id,
  		dataType:"json",
  		success:function(data){
            //初始化弹窗
            var mark = new MarkBox(600,400,"编辑图书",form.get(0));
            mark.init();
            //填充表单数据
            form.find("input[name=id]").val(data.id);
            form.find("input[name=name]").val(data.name);
            form.find("input[name=author]").val(data.author);
            form.find("input[name=category]").val(data.category);
            form.find("input[name=description]").val(data.description);

            //对表单提交按钮重新绑定单击事件
            form.find("input[type=button]").unbind("click").click(function(){
                $.ajax({
                  type:"put",
                  url:"/books/book",
                  dataType:"json",
                  data:form.serialize(),
                  success:function(data){
                    if(data.bool==1){
                      //关闭弹窗
                      mark.close();
                      //重新渲染数据
                      initList();
                    }
                  }
                });
            });
  		}
  	});
  }
//添加图书信息
  function addBook(){
    $("#addBookId").click(function(){
        var form = $("#addBookFrom");
        form.get(0).reset();
        //初始化弹窗
        var mark = new MarkBox(600,400,"添加图书",form.get(0));
        mark.init();
        //$("#addBookFrom").find("input[type=hidden]").val("");
        form.find("input[type=button]").unbind("click").click(function(){
          $.ajax({
             type:"post",
             url:"/books/book",
             data:form.serialize(),
             dataType:"json",
             success:function(data){
              if(data.bool==1){
                //关闭弹窗
                mark.close();
                //添加图书成功后重选渲染
                initList();
              }else{
                alert("添加失败");
              }
             }
          });
        });
    });
  }

//删除图书信息
  function deleteBook(id){
    $.ajax({
      type:"delete",
      url:"/books/book/"+id,
      dataType:"json",
      success:function(data){
        if(data.bool==1){
          //删除成功后重新渲染数据列表
          initList();
        }
      }
    });
  }

});