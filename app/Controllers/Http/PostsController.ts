// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';

export default class PostsController {
  public async index({ view }) {
    
    return view.render('posts')
  }

  public async getData({request,response}){
      response.header('Access-Control-Allow-Origin', '*');
      const {draw,start,length,order,columns,search} = request.all();
      
      if (typeof order == 'undefined') {
          var column_name = 'datatables_demo.id'
          var column_sort_order = 'desc'
      } else {
          var column_name = order[0]['column'];
          var column_index = columns[column_index]['data'];
          var column_sort_order = order[0]['dir'];
      }

      var search_query = `
      AND (first_name LIKE '%${search.value}%' 
        OR last_name LIKE '%${search.value}%' 
        OR position LIKE '%${search.value}%' 
        OR office LIKE '%${search.value}%'
      )`;
      const data = await Database.rawQuery('SELECT COUNT(*) AS Total FROM datatables_demo')
        if (data[0]) {
            var total_records = data[0][0].Total;
        } else {
            var total_records = 0
        }
      const data2 = await Database.rawQuery(`SELECT COUNT(*) AS Total FROM datatables_demo WHERE 1 ${search_query}`)
      if (data2[0]) {
        var total_records_with_filter = data[0][0].Total;
      } else {
        var total_records_with_filter = 0
      }
      
      var query = `
          SELECT * FROM datatables_demo 
          WHERE 1 ${search_query} 
          ORDER BY ${column_name} ${column_sort_order} 
          LIMIT ${start}, ${length}`;
      var data_arr = [];
      const result = await Database.rawQuery(query);
      result[0].forEach(row => {
          data_arr.push({
              'first_name' : row.first_name,
              'last_name' : row.last_name,
              'position' : row.position,
              'office' : row.office,
              "start_date":row.start_date,
              "salary": row.salary
          });
      });
      var output = {
        'draw': draw,
        'iTotalRecords' : total_records,
        'iTotalDisplayRecords' : total_records_with_filter,
        'aaData' : data_arr
      };
      response.json(output);
  }
}
