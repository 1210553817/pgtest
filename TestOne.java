package dwf.mtest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.RegionUtil;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.Test;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class TestOne {
	public static void main(String[] args) {
		testTrd();

	}

	public static void testTrd() {
		List<List<String>> data = new ArrayList<List<String>>();
		List<String> tita = new ArrayList<String>();
		List<String> titb = new ArrayList<String>();
		tita.add("交易时间 ");
		titb.add("报告机构  ");
		tita.add("");
		tita.add("机构历年交易总数");
		titb.add("笔数");
		titb.add("金额");
		for (int i = 0; i < 6; i++) {
			tita.add("");
			tita.add("200" + i);
			titb.add("笔数");
			titb.add("金额");
		}
		data.add(tita);
		data.add(titb);
		for (int j = 0; j < 8; j++) {
			List<String> cttdata = new ArrayList<String>();
			cttdata.add("报告机构" + j);
			cttdata.add("34" + j);
			cttdata.add("65" + j);
			for (int i = 0; i < 6; i++) {
				cttdata.add("" + i * 34);
				cttdata.add("" + i * 13);
			}
			data.add(cttdata);
		}
		// for (List<String> strs : data) {
		// for (String str : strs) {
		// System.out.print(str+"\t");
		// }
		// System.out.println("");
		// }
		try {
			OutputStream fos = new FileOutputStream("C:\\Users\\Dong\\Desktop\\testExpClue.xlsx");
			expTrdCount("testSheet", data, fos);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public static void expTrdCount(String sheetName, List<List<String>> data, OutputStream os) throws Exception {
		if (null == data || data.size() < 2) {
			return;
		}
		int ColWidth = 3000;
		Workbook wb = new XSSFWorkbook();
		Sheet s = wb.createSheet();
		wb.setSheetName(0, sheetName);
		Row r = null;
		Cell c = null;
		CellRangeAddress addr = null;
		Map<String, CellStyle> styles = styles(wb);
		List<String> titlea = data.get(0);
		List<String> titleb = data.get(1);
		if (null == titlea || null == titleb || titlea.size() == 0 || titleb.size() == 0)
			return;
		r = s.createRow(0);
		r.setHeight((short) 0x200);
		for (int j = 0; j < titlea.size(); j++) {
			int colb = (j + 1) % 2;
			if (0 == colb) {
				addr = new CellRangeAddress(0, 0, j, j + 1);
				s.addMergedRegion(addr);
			}
			c = r.createCell(j);
			CellStyle csty = styles.get("header");
			c.setCellStyle(csty);
			s.setColumnWidth(j, ColWidth);
			if (0 == colb && ((j + 1) < titlea.size())) {
				c.setCellValue(titlea.get(j + 1));
			} else {
				c.setCellValue(titlea.get(j));
			}
		}
		int j = 0;
		for (int i = 1; i < data.size(); i++) {
			r = s.createRow(i);
			List<String> content = data.get(i);
			j = 0;
			for (String ctt : content) {
				c = r.createCell(j);
				if (1 == i) {
					c.setCellStyle(styles.get("cellBorder"));
				} else {
					c.setCellStyle(styles.get("cell"));
				}
				c.setCellValue(ctt);
				s.setColumnWidth(j, ColWidth);
				j++;
			}
		}
		wb.write(os);
		os.close();

	}

	public static void export(String sheetName, List<List<String>> data, OutputStream os) throws Exception {
		if (null == data || data.size() < 2) {
			return;
		}
		int ColWidth = 3000;
		Workbook wb = new XSSFWorkbook();
		Sheet s = null;
		Row r = null;
		Cell c = null;
		CellRangeAddress addr = null;
		Map<String, CellStyle> styles = styles(wb);
		List<String> titlea = data.get(0);
		List<String> titleb = data.get(1);
		if (null == titlea || null == titleb || titlea.size() == 0 || titleb.size() == 0)
			return;
		s = wb.createSheet();
		wb.setSheetName(0, sheetName);
		r = s.createRow(0);
		r.setHeight((short) 0x200);
		for (int j = 0; j < titlea.size(); j++) {
			int colb = (j + 1) % 2;
			if (0 == colb) {
				addr = new CellRangeAddress(0, 0, j, j + 1);
				s.addMergedRegion(addr);
			}
			c = r.createCell(j);
			CellStyle csty = styles.get("header");
			c.setCellStyle(csty);
			s.setColumnWidth(j, ColWidth);
			if (0 == colb && ((j + 1) < titlea.size())) {
				c.setCellValue(titlea.get(j + 1));
			} else {
				c.setCellValue(titlea.get(j));
			}
		}
		int j = 0;
		for (int i = 1; i < data.size(); i++) {
			r = s.createRow(i);
			List<String> content = data.get(i);
			j = 0;
			for (String ctt : content) {
				c = r.createCell(j);
				if (1 == i) {
					c.setCellStyle(styles.get("cellBorder"));
				} else {
					c.setCellStyle(styles.get("cell"));
				}
				c.setCellValue(ctt);
				s.setColumnWidth(j, ColWidth);
				j++;
			}
		}
		wb.write(os);
		os.close();

	}

	public static Map<String, CellStyle> styles(Workbook wb) {
		short bwth1 = 1;
		short bwth2 = 2;
		Map<String, CellStyle> styles = new HashMap<String, CellStyle>();
		CellStyle style;
		Font titleFont = wb.createFont();
		titleFont.setFontHeightInPoints((short) 18);
		titleFont.setBoldweight(Font.BOLDWEIGHT_BOLD);
		style = wb.createCellStyle();
		style.setAlignment(CellStyle.ALIGN_CENTER);
		style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
		style.setFont(titleFont);
		styles.put("title", style);

		Font hf = wb.createFont();
		hf.setBoldweight(Font.BOLDWEIGHT_BOLD);

		style = wb.createCellStyle();
		style.setAlignment(CellStyle.ALIGN_CENTER);
		style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
		style.setWrapText(true);
		style.setBorderBottom(bwth2);
		style.setBorderLeft(bwth2);
		style.setBorderRight(bwth2);
		style.setBorderTop(bwth2);
		style.setFont(hf);
		styles.put("header", style);

		style = wb.createCellStyle();
		style.setAlignment(CellStyle.ALIGN_CENTER);
		style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
		style.setWrapText(true);
		styles.put("cell", style);

		style = wb.createCellStyle();
		style.setAlignment(CellStyle.ALIGN_CENTER);
		style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
		style.setWrapText(true);
		style.setBorderBottom(bwth1);
		style.setBorderLeft(bwth1);
		style.setBorderRight(bwth1);
		style.setBorderTop(bwth1);
		styles.put("cellBorder", style);

		style = wb.createCellStyle();
		style.setAlignment(CellStyle.ALIGN_CENTER);
		style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
		style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
		style.setFillPattern(CellStyle.SOLID_FOREGROUND);
		style.setDataFormat(wb.createDataFormat().getFormat("0.00"));
		styles.put("formula", style);

		style = wb.createCellStyle();
		style.setAlignment(CellStyle.ALIGN_CENTER);
		style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
		style.setFillForegroundColor(IndexedColors.GREY_40_PERCENT.getIndex());
		style.setFillPattern(CellStyle.SOLID_FOREGROUND);
		style.setDataFormat(wb.createDataFormat().getFormat("0.00"));
		styles.put("formula_2", style);

		return styles;
	}

	public static boolean deleteDir(File dir) {
		if (dir.isDirectory()) {
			String[] children = dir.list();
			// 递归删除目录中的子目录下
			for (int i = 0; i < children.length; i++) {
				boolean success = deleteDir(new File(dir, children[i]));
				if (!success) {
					return false;
				}
			}
		}
		// 目录此时为空，可以删除
		return dir.delete();
	}

	private static final String expJson = "[{\"elem\":\"#yourTableHolderId\",\"width\":\"100%\",\"cellMinWidth\":100,\"limit\":1000,\"data\":[{\"timep\":\"2016年\",\"VAL01\":\"0\",\"VAR01\":\"0.0\",\"VAL02\":\"0\",\"VAR02\":\"0.0\",\"VAL03\":\"0\",\"VAR03\":\"0.0\",\"VAL04\":\"0\",\"VAR04\":\"0.0\",\"VAL05\":\"0\",\"VAR05\":\"0.0\",\"VAL06\":\"0\",\"VAR06\":\"0.0\"},{\"timep\":\"2017年\",\"VAL01\":\"2400\",\"VAR01\":\"0.0\",\"VAL02\":\"700\",\"VAR02\":\"0.0\",\"VAL03\":\"800\",\"VAR03\":\"0.0\",\"VAL04\":\"900\",\"VAR04\":\"0.0\",\"VAL05\":\"0\",\"VAR05\":\"0.0\",\"VAL06\":\"0\",\"VAR06\":\"0.0\"},{\"timep\":\"2018年\",\"VAL01\":\"6000\",\"VAR01\":\"150.0\",\"VAL02\":\"1000\",\"VAR02\":\"42.86\",\"VAL03\":\"2000\",\"VAR03\":\"150.0\",\"VAL04\":\"3000\",\"VAR04\":\"233.33\",\"VAL05\":\"0\",\"VAR05\":\"0.0\",\"VAL06\":\"0\",\"VAR06\":\"0.0\"}],\"cols\":[[{\"title\":\"电源投资\",\"align\":\"center\",\"colspan\":14}],[{\"title\":\"时间\",\"align\":\"center\",\"field\":\"timep\",\"rowspan\":\"2\",\"colspan\":\"2\"},{\"title\":\"全部\",\"align\":\"center\",\"colspan\":\"2\"},{\"title\":\"火电\",\"align\":\"center\",\"colspan\":\"2\"},{\"title\":\"水电\",\"align\":\"center\",\"colspan\":\"2\"},{\"title\":\"核电\",\"align\":\"center\",\"colspan\":\"2\"},{\"title\":\"风电\",\"align\":\"center\",\"colspan\":\"2\"},{\"title\":\"光伏\",\"align\":\"center\",\"colspan\":\"2\"}],[{\"field\":\"VAL01\",\"title\":\"电源投资\",\"align\":\"left\"},{\"field\":\"VAR01\",\"title\":\"同比增速\",\"align\":\"left\"},{\"field\":\"VAL02\",\"title\":\"电源投资\",\"align\":\"left\"},{\"field\":\"VAR02\",\"title\":\"同比增速\",\"align\":\"left\"},{\"field\":\"VAL03\",\"title\":\"电源投资\",\"align\":\"left\"},{\"field\":\"VAR03\",\"title\":\"同比增速\",\"align\":\"left\"},{\"field\":\"VAL04\",\"title\":\"电源投资\",\"align\":\"left\"},{\"field\":\"VAR04\",\"title\":\"同比增速\",\"align\":\"left\"},{\"field\":\"VAL05\",\"title\":\"电源投资\",\"align\":\"left\"},{\"field\":\"VAR05\",\"title\":\"同比增速\",\"align\":\"left\"},{\"field\":\"VAL06\",\"title\":\"电源投资\",\"align\":\"left\"},{\"field\":\"VAR06\",\"title\":\"同比增速\",\"align\":\"left\"}]]}]";

	@Test
	public void testDoExport() {
		try {
			 OutputStream fos = new FileOutputStream("C:\\Users\\Dong\\Desktop\\testDoExport.xlsx");
			doExport(expJson, fos);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public static void doExport(String arrs, OutputStream os) throws Exception {
		Gson gson = new Gson();
		XSSFWorkbook wb = new XSSFWorkbook();
		Sheet s = null;
		Row r = null;
		Cell c = null;
		CellRangeAddress addr = null;
		JsonArray dats = gson.fromJson(arrs, JsonArray.class);
		Map<String, CellStyle> styles = styles(wb);
		CellStyle celly = styles.get("cellBorder");
		int m=0;
		for (JsonElement data : dats) {
			if(!data.isJsonObject())throw new Exception("data error!");
			JsonObject dat = data.getAsJsonObject();
			JsonElement cs = dat.get("cols");
			JsonElement ds = dat.get("data");
			if (!(cs.isJsonArray() && ds.isJsonArray()))throw new Exception("grid datas error!");
			JsonElement snm= dat.get("sheetName");
			String shtnm = snm != null && snm.isJsonPrimitive() ? snm.getAsString() : "sheet"+m;
			JsonArray cols = cs.getAsJsonArray();
			JsonArray datas = ds.getAsJsonArray();
			s = wb.createSheet();
			wb.setSheetName(m, shtnm);

			int i = 1, j = 0, k = 1;
			Map<Integer,Integer> sph = new HashMap<Integer, Integer>();
			Map<Integer,Integer> spv = new HashMap<Integer, Integer>();
			for (JsonElement ce : cols) {
				if (!ce.isJsonArray())throw new Exception("cols error!");

				JsonArray ces = ce.getAsJsonArray();
			 	r = s.createRow(i);
				r.setHeight((short) 0x200);
				
				int csp = 1 , rsp = 1;
				for (JsonElement cm : ces) {
					if (!cm.isJsonObject())	throw new Exception("cols item error!");
					
					JsonObject cmo = cm.getAsJsonObject();
					JsonElement tite = cmo.get("title");
					JsonElement flde = cmo.get("field");
					JsonElement alie = cmo.get("align");
					JsonElement cspe = cmo.get("colspan");
					JsonElement rspe = cmo.get("rowspan");
					String tit = tite != null && tite.isJsonPrimitive() ? tite.getAsString() : "";
					String fld = flde != null && flde.isJsonPrimitive() ? flde.getAsString() : "";
					String ali = alie != null && alie.isJsonPrimitive() ? alie.getAsString() : "";
					csp = cspe != null && cspe.isJsonPrimitive() ? cspe.getAsInt() : 1;
					rsp = rspe != null && rspe.isJsonPrimitive() ? rspe.getAsInt() : 1;

					for (int y = 0; y < rsp; y++) {
						for (int x = 0; x < csp; x++) {
							
							Object xo = sph.get(i+y);
							int xp = xo!=null?sph.get(i+y):0;

							if(x==0&&y==0) {
								j = xp;
							}
							
							sph.put(i+y, ++xp);
						}
					}
					
					addr = new CellRangeAddress(i, i+rsp-1, j+k, j+k+csp-1);
					s.addMergedRegion(addr);
					
					c = r.createCell(j+k);
					c.setCellStyle(celly);
					s.setColumnWidth(j+k, 3000);
					c.setCellValue(tit);
					setBorder(1, addr, s, wb);
					j+=csp;
				}
				i+=rsp;
			}
			
			m++;
		}
		wb.write(os);
	}
	
    private static void setBorder(int i, CellRangeAddress addr, Sheet sheet, XSSFWorkbook workBook){
        RegionUtil.setBorderBottom(i, addr, sheet, workBook);
        RegionUtil.setBorderLeft(i, addr, sheet, workBook);
        RegionUtil.setBorderRight(i, addr, sheet, workBook);
        RegionUtil.setBorderTop(i, addr, sheet, workBook);
    }
	

}

