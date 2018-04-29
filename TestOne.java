package dwf.mtest;

import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import org.junit.Test;

public class TestOne {
	
	private static final String expJson = "{\"elem\":\"#yourTableHolderId\",\"sheetName\":\"电源投资\",\"width\":\"100%\",\"cellMinWidth\":100,\"limit\":1000,\"data\":[{\"timep\":\"2016年\",\"VAL01\":\"0\",\"VAR01\":\"0.0\",\"VAL02\":\"0\",\"VAR02\":\"0.0\",\"VAL03\":\"0\",\"VAR03\":\"0.0\",\"VAL04\":\"0\",\"VAR04\":\"0.0\",\"VAL05\":\"0\",\"VAR05\":\"0.0\",\"VAL06\":\"0\",\"VAR06\":\"0.0\"},{\"timep\":\"2017年\",\"VAL01\":\"2400\",\"VAR01\":\"0.0\",\"VAL02\":\"700\",\"VAR02\":\"0.0\",\"VAL03\":\"800\",\"VAR03\":\"0.0\",\"VAL04\":\"900\",\"VAR04\":\"0.0\",\"VAL05\":\"0\",\"VAR05\":\"0.0\",\"VAL06\":\"0\",\"VAR06\":\"0.0\"},{\"timep\":\"2018年\",\"VAL01\":\"6000\",\"VAR01\":\"150.0\",\"VAL02\":\"1000\",\"VAR02\":\"42.86\",\"VAL03\":\"2000\",\"VAR03\":\"150.0\",\"VAL04\":\"3000\",\"VAR04\":\"233.33\",\"VAL05\":\"0\",\"VAR05\":\"0.0\",\"VAL06\":\"0\",\"VAR06\":\"0.0\"}],\"cols\":[[{\"title\":\"电源投资\",\"align\":\"center\",\"colspan\":13}],[{\"title\":\"时间\",\"align\":\"center\",\"field\":\"timep\",\"rowspan\":\"2\"},{\"title\":\"全部\",\"align\":\"center\",\"colspan\":\"2\"},{\"title\":\"火电\",\"align\":\"center\",\"colspan\":\"2\"},{\"title\":\"水电\",\"align\":\"center\",\"colspan\":\"2\"},{\"title\":\"核电\",\"align\":\"center\",\"colspan\":\"2\"},{\"title\":\"风电\",\"align\":\"center\",\"colspan\":\"2\"},{\"title\":\"光伏\",\"align\":\"center\",\"colspan\":\"2\"}],[{\"field\":\"VAL01\",\"title\":\"电源投资\",\"align\":\"right\"},{\"field\":\"VAR01\",\"title\":\"同比增速\",\"align\":\"right\"},{\"field\":\"VAL02\",\"title\":\"电源投资\",\"align\":\"right\"},{\"field\":\"VAR02\",\"title\":\"同比增速\",\"align\":\"right\"},{\"field\":\"VAL03\",\"title\":\"电源投资\",\"align\":\"right\"},{\"field\":\"VAR03\",\"title\":\"同比增速\",\"align\":\"right\"},{\"field\":\"VAL04\",\"title\":\"电源投资\",\"align\":\"right\"},{\"field\":\"VAR04\",\"title\":\"同比增速\",\"align\":\"right\"},{\"field\":\"VAL05\",\"title\":\"电源投资\",\"align\":\"right\"},{\"field\":\"VAR05\",\"title\":\"同比增速\",\"align\":\"right\"},{\"field\":\"VAL06\",\"title\":\"电源投资\",\"align\":\"right\"},{\"field\":\"VAR06\",\"title\":\"同比增速\",\"align\":\"right\"}]]}";

	private static final String expJson1 = "{\"elem\":\"#yourTableHolderId\",\"sheetName\":\"发电量\",\"width\":\"100%\",\"cellMinWidth\":100,\"limit\":1000,\"data\":[{\"timep\":\"2016年\",\"VAL01\":\"0\",\"VAR01\":\"0.0\",\"VAL02\":\"0\",\"VAR02\":\"0.0\",\"VAL03\":\"0\",\"VAR03\":\"0.0\",\"VAL04\":\"0\",\"VAR04\":\"0.0\",\"VAL05\":\"0\",\"VAR05\":\"0.0\",\"VAL06\":\"0\",\"VAR06\":\"0.0\"},{\"timep\":\"2017年\",\"VAL01\":\"2400\",\"VAR01\":\"0.0\",\"VAL02\":\"700\",\"VAR02\":\"0.0\",\"VAL03\":\"800\",\"VAR03\":\"0.0\",\"VAL04\":\"900\",\"VAR04\":\"0.0\",\"VAL05\":\"0\",\"VAR05\":\"0.0\",\"VAL06\":\"0\",\"VAR06\":\"0.0\"},{\"timep\":\"2018年\",\"VAL01\":\"6000\",\"VAR01\":\"150.0\",\"VAL02\":\"1000\",\"VAR02\":\"42.86\",\"VAL03\":\"2000\",\"VAR03\":\"150.0\",\"VAL04\":\"3000\",\"VAR04\":\"233.33\",\"VAL05\":\"0\",\"VAR05\":\"0.0\",\"VAL06\":\"0\",\"VAR06\":\"0.0\"}],\"cols\":[[{\"title\":\"发电量\",\"align\":\"center\",\"colspan\":13}],[{\"title\":\"时间\",\"align\":\"center\",\"field\":\"timep\",\"rowspan\":\"2\"},{\"title\":\"全部\",\"align\":\"center\",\"colspan\":\"2\"},{\"title\":\"火电\",\"align\":\"center\",\"colspan\":\"2\"},{\"title\":\"水电\",\"align\":\"center\",\"colspan\":\"2\"},{\"title\":\"核电\",\"align\":\"center\",\"colspan\":\"2\"},{\"title\":\"风电\",\"align\":\"center\",\"colspan\":\"2\"},{\"title\":\"光伏\",\"align\":\"center\",\"colspan\":\"2\"}],[{\"field\":\"VAL01\",\"title\":\"发电量\",\"align\":\"right\"},{\"field\":\"VAR01\",\"title\":\"同比增速\",\"align\":\"right\"},{\"field\":\"VAL02\",\"title\":\"发电量\",\"align\":\"right\"},{\"field\":\"VAR02\",\"title\":\"同比增速\",\"align\":\"right\"},{\"field\":\"VAL03\",\"title\":\"发电量\",\"align\":\"right\"},{\"field\":\"VAR03\",\"title\":\"同比增速\",\"align\":\"right\"},{\"field\":\"VAL04\",\"title\":\"发电量\",\"align\":\"right\"},{\"field\":\"VAR04\",\"title\":\"同比增速\",\"align\":\"right\"},{\"field\":\"VAL05\",\"title\":\"发电量\",\"align\":\"right\"},{\"field\":\"VAR05\",\"title\":\"同比增速\",\"align\":\"right\"},{\"field\":\"VAL06\",\"title\":\"发电量\",\"align\":\"right\"},{\"field\":\"VAR06\",\"title\":\"同比增速\",\"align\":\"right\"}]]}";

	private static final String expJson2 = "{\"elem\":\"#yourTableHolderId\",\"width\":\"100%\",\"cellMinWidth\":100,\"sheetName\":\"跨省区输入输出电量\",\"limit\":1000,\"data\":[{\"timep\":\"2017年1季度\",\"la\":\"900\",\"ga\":\"900\",\"ra\":\"0.0\",\"lb\":\"1800\",\"gb\":\"1800\",\"rb\":\"0.0\"},{\"timep\":\"2017年2季度\",\"la\":\"0\",\"ga\":\"900\",\"ra\":\"0.0\",\"lb\":\"0\",\"gb\":\"1800\",\"rb\":\"0.0\"},{\"timep\":\"2017年3季度\",\"la\":\"0\",\"ga\":\"900\",\"ra\":\"0.0\",\"lb\":\"0\",\"gb\":\"1800\",\"rb\":\"0.0\"},{\"timep\":\"2017年4季度\",\"la\":\"0\",\"ga\":\"900\",\"ra\":\"0.0\",\"lb\":\"0\",\"gb\":\"1800\",\"rb\":\"0.0\"},{\"timep\":\"2018年1季度\",\"la\":\"2200\",\"ga\":\"3100\",\"ra\":\"144.44\",\"lb\":\"1100\",\"gb\":\"2900\",\"rb\":\"-38.89\"},{\"timep\":\"2018年2季度\",\"la\":\"0\",\"ga\":\"3100\",\"ra\":\"0.0\",\"lb\":\"0\",\"gb\":\"2900\",\"rb\":\"0.0\"}],\"cols\":[[{\"title\":\"跨省区输入输出电量\",\"align\":\"center\",\"colspan\":9}],[{\"title\":\"测试\",\"align\":\"center\",\"rowspan\":\"8\"},{\"title\":\"行合并\",\"align\":\"center\",\"rowspan\":\"8\"},{\"title\":\"时间\",\"align\":\"center\",\"field\":\"timep\",\"rowspan\":\"2\"},{\"title\":\"送出电量\",\"align\":\"center\",\"colspan\":\"3\"},{\"title\":\"送出电量\",\"align\":\"center\",\"colspan\":\"3\"}],[{\"field\":\"la\",\"title\":\"当期值\",\"align\":\"left\"},{\"field\":\"ga\",\"title\":\"累计值\",\"align\":\"left\"},{\"field\":\"ra\",\"title\":\"同比增速\",\"align\":\"left\"},{\"field\":\"lb\",\"title\":\"当期值\",\"align\":\"left\"},{\"field\":\"gb\",\"title\":\"累计值\",\"align\":\"left\"},{\"field\":\"rb\",\"title\":\"同比增速\",\"align\":\"left\"}]]}";

	@Test
	public void testDoExport() {
		try {
			OutputStream fos = new FileOutputStream("C:\\Users\\Dong\\Desktop\\testDoExportA.xlsx");
			doExport("[" + expJson + "," + expJson1 + "," + expJson2 + "]", fos);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/**
	 * 表格导出
	 * @param arrs	: json array; 数组每一项为一个sheet页数据
	 * 		数据格式与layui数据表格option一致：{sheetName(sheet名)："", cols(表头数据):[[],[]...], datas(数据部分):[{},...]}
	 * 		表头项属性：{title：, field：, align：, colspan：, rowspan：}
	 * @param os	: 输出流
	 * @throws Exception
	 */
	public static void doExport(String arrs, OutputStream os) throws Exception {
		Gson gson = new Gson();
		XSSFWorkbook wb = new XSSFWorkbook();
		Sheet s = null;
		Row r = null;
		Cell c = null;
		CellRangeAddress addr = null;
		JsonArray dats = gson.fromJson(arrs, JsonArray.class);
		CellStyle heady = headStyle(wb);
		int m = 0;
		for (JsonElement data : dats) {
			if (!data.isJsonObject())throw new Exception("sheet data error! sheetIndex："+m);
			JsonObject dat = data.getAsJsonObject();
			JsonElement cs = dat.get("cols");
			JsonElement ds = dat.get("data");
			if (!cs.isJsonArray())throw new Exception("header datas error! sheetIndex："+m);
			JsonElement snm = dat.get("sheetName");
			String sht = snm != null && snm.isJsonPrimitive() ? snm.getAsString() : "sheet" + m;
			JsonArray cols = cs.getAsJsonArray();
			s = wb.createSheet();
			wb.setSheetName(m, sht);
			Map<Integer, Integer> ph = new HashMap<Integer, Integer>();
			List<CellRangeAddress> mgs = new ArrayList<CellRangeAddress>();
			List<Map<String, String>> flds = new ArrayList<Map<String, String>>();
			int i = 0, j = 0, k = 0;
			for (JsonElement ce : cols) {
				if (!ce.isJsonArray())throw new Exception("cols error! sheetIndex："+m);
				JsonArray ces = ce.getAsJsonArray();
				r = s.createRow(i);
				r.setHeight((short) 0x200);
				int csp = 1, rsp = 1;
				for (JsonElement cm : ces) {
					if (!cm.isJsonObject())throw new Exception("cols item error! sheetIndex："+m);
					JsonObject cmo = cm.getAsJsonObject();
					JsonElement tite = cmo.get("title");
					JsonElement flde = cmo.get("field");
					JsonElement alie = cmo.get("align");
					JsonElement cspe = cmo.get("colspan");
					JsonElement rspe = cmo.get("rowspan");
					String tit = tite != null && tite.isJsonPrimitive() ? tite.getAsString() : "";
					String fld = flde != null && flde.isJsonPrimitive() ? flde.getAsString() : null;
					String ali = alie != null && alie.isJsonPrimitive() ? alie.getAsString() : null;
					csp = cspe != null && cspe.isJsonPrimitive() ? cspe.getAsInt() : 1;
					rsp = rspe != null && rspe.isJsonPrimitive() ? rspe.getAsInt() : 1;
					if (fld != null) {
						Map<String, String> mp = new HashMap<String, String>();
						mp.put("field", fld);
						if (ali != null)
							mp.put("align", ali);
						flds.add(mp);
					}
					for (int y = 0; y < rsp; y++) {
						for (int x = 0; x < csp; x++) {
							Object xo = ph.get(i + y);
							int xp = xo != null ? ph.get(i + y) : 0;
							if (x == 0 && y == 0) {
								j = xp;
							}
							ph.put(i + y, ++xp);
						}
					}
					addr = new CellRangeAddress(i, i + rsp - 1, j + k, j + k + csp - 1);
					mgs.add(addr);
					c = r.createCell(j + k);
					s.setColumnWidth(j + k, 3000);
					c.setCellStyle(heady);
					c.setCellValue(tit);
					
					j += csp;
				}
				i += rsp;
			}
			if (ds.isJsonArray()) {
				JsonArray datas = ds.getAsJsonArray();
				int x = 0, y;
				for (JsonElement cn : datas) {
					if (!cn.isJsonObject())throw new Exception("datas item error! sheetIndex："+m);
					r = s.createRow(i + x);
					r.setHeight((short) 0x200);
					JsonObject dmo = cn.getAsJsonObject();
					Object yo = ph.get(i + x);
					y = yo != null ? ph.get(i + x) : 0;
					for (Map<String, String> map : flds) {
						String fld = map.get("field");
						String ali = map.get("align");
						JsonElement valu = dmo.get(fld);
						String vale = valu != null && valu.isJsonPrimitive() ? valu.getAsString() : "";
						c = r.createCell(y + k);
						CellStyle cely = cellStyle(wb);
						if("left".equals(ali)){
							cely.setAlignment(CellStyle.ALIGN_LEFT);
						}else if("right".equals(ali)){
							cely.setAlignment(CellStyle.ALIGN_RIGHT);
						}
						c.setCellStyle(cely);
						s.setColumnWidth(y + k, 3000);
						c.setCellValue(vale);

						y++;
					}

					x++;
				}
			}
			for (CellRangeAddress cra : mgs) {
				int fr = cra.getFirstRow();
				int lr = cra.getLastRow();
				int fc = cra.getFirstColumn();
				int lc = cra.getLastColumn();
				for (int l = fr; l <= lr; l++) {
					for (int g = fc; g <= lc; g++) {
						if (!(l == fr && g == fc)) {
							Row rr = s.getRow(l);
							if (rr != null) {
								Cell cc = rr.createCell(g);
								cc.setCellStyle(heady);
							}
						}
					}
				}
				s.addMergedRegion(cra);
			}
			m++;
		}
		wb.write(os);
	}
	
	public static CellStyle headStyle(Workbook wb) {
		short w = 1;
		Font hf = wb.createFont();
		hf.setFontName("微软雅黑");
		hf.setBoldweight(Font.BOLDWEIGHT_BOLD);
		CellStyle cs = wb.createCellStyle();
		cs.setAlignment(CellStyle.ALIGN_CENTER);
		cs.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
		cs.setWrapText(true);
		cs.setBorderBottom(w);
		cs.setBorderLeft(w);
		cs.setBorderRight(w);
		cs.setBorderTop(w);
		cs.setFont(hf);
		return cs;
	}
	public static CellStyle cellStyle(Workbook wb) {
		short w = 1;
		CellStyle cs = wb.createCellStyle();
		cs.setAlignment(CellStyle.ALIGN_CENTER);
		cs.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
		cs.setWrapText(true);
		cs.setBorderBottom(w);
		cs.setBorderLeft(w);
		cs.setBorderRight(w);
		cs.setBorderTop(w);
		return cs;
	}

}
