      // $.ajaxSetup({
      //     headers:{
      //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      //     }
      // });

      // Select all data
      function allData(){
        $.ajax({
            type:"GET",
            dataType:"json",
            url:"https://pacific-journey-56377.herokuapp.com/api/employee/all",
            success:function(response){
                console.log(response);
                var data="";
                $.each(response,function(key,value){
                    data=data+"<tr>";
                    data=data+"<td>"+value.name+"</td>";
                    data=data+"<td>"+value.title+"</td>";
                    data=data+"<td>"+value.institute+"</td>";
                    //data=data+"<td>"+value.image+"</td>";
                    data=data+"<td><button class='btn btn-info' onclick='editData("+value.id+")' data-toggle='modal' data-target='#editModal'>EDIT</button>";
                    data=data+" <button class='btn btn-danger' onclick='deleteData("+value.id+")'>DELETE</button></td>";
                    data=data+"</tr>";
                });
                $('tbody').html(data);
            }
        });
      }

      allData();

      // Dynamically auto call a function after a fixed time

      window.setInterval(allData, 1000);


      // Add with Form
      $('#laravel-ajax-submit').submit(function(e) {
        e.preventDefault();
        var formData = new FormData(this);
            $.ajax({
                type:'POST',
                url:"https://pacific-journey-56377.herokuapp.com/api/employee/add/with-form",
                data: formData,
                cache:false,
                contentType: false,
                processData: false,
                success: (data) => {
                    $('#addModal').modal('hide');
                    allData();
                    this.reset();
                    //alert('File has been uploaded successfully');
                    console.log(data);
                },
                error: function(data){
                    console.log(data);
            }
        });
      });

      // Show Edit Data Modal
      function editData(id){
        $.ajax({
            type:"post",
            dataType:"json",
            data:{id:id},
            url:"https://pacific-journey-56377.herokuapp.com/api/employee/edit",
            success:function(response){
                console.log(response);
                $('#editId').val(response.id);
                $('#editName').val(response.name);
                $('#editTitle').val(response.title);
                $('#editInstitute').val(response.institute);
            },
            error:function(error){
                console.log(error);                             
            }
        });
      }


      // function editData(id){
      //     $.ajax({
      //         method:"GET",
      //         dataType:"JSON",
      //         url: "{{ url('api/employee/edit/')}}"+id,
      //         success:function(response){
      //             console.log(response);
      //             $('#editId').val(response.id);
      //             $('#editName').val(response.name);
      //             $('#editTitle').val(response.title);
      //             $('#editInstitute').val(response.institute);
      //         },
      //         error:function(errorData){
      //             console.log(errorData);
      //         }
      //     });
      // }


      // Update with Form

      $('#laravel-ajax-update').submit(function(e) {
        e.preventDefault();
        var formDataUpdate = new FormData(this);
            $.ajax({
                type:'POST',
                url:"https://pacific-journey-56377.herokuapp.com/api/employee/update/with-form",
                data: formDataUpdate,
                cache:false,
                contentType: false,
                processData: false,
                success: (data) => {
                    $('#editModal').modal('hide');
                    allData();
                    this.reset();
                    //alert('File has been uploaded successfully');
                    console.log(data.msg);
                },
                error: function(data){
                    console.log(data);
            }
        });
      });

      // Delete Data

      function deleteData(id){
        $.ajax({
            type:"DELETE",
            dataType:"json",
            data:{id:id},
            url:"https://pacific-journey-56377.herokuapp.com/api/employee/delete",
            success:function(response){
                allData();
                console.log('successfully data deleted!');
            },
            error:function(error){
                console.log(error);  
            }
        });

      }

      // function clearData(){
      //     $('#name').val('');
      //     $('#title').val('');
      //     $('#institute').val('');
      //     $('#nameError').text('');
      //     $('#titleError').text('');
      //     $('#instituteError').text('');                        
      // }

      // function addEmployeeModal(){
      //     clearData();

      //     $('#addT').show();
      //     $('#addH').show();
      //     $('#addB').show();

      //     $('#editT').hide();
      //     $('#editH').hide();
      //     $('#editB').hide();            
      // }

