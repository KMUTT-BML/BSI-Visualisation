from openpyxl import Workbook
import openpyxl
import json
import subprocess

workbook = openpyxl.load_workbook('FBA.xlsx')
worksheet = workbook.get_sheet_by_name("reactions")

# Get iter rows
iter_rows = worksheet.iter_rows()

# Add to row list
row_list = []
for row in iter_rows:
    row_list.append(row)

# Get header list
header_list = []
for header_row in row_list[0]:
    # print(header_row.value)
    header_list.append(header_row.value)

row_list.pop(0)

# Prepare data list
data_list = []

for row in row_list:
    cell_dict = {}
    if row[2].value.find('[c]') != -1:
        #Abbreviation column
        cell_dict['abbr'] = row[0].value
        #Name column
        cell_dict['name'] = row[1].value
        #Reaction column
        cell_dict['reaction'] = row[2].value
        #Subsystem column
        cell_dict['pathway'] = row[6].value
        #Reversible column , Lower bound column , and Upper bound column
        #row[7] == 1 means reversible column = 1
        #so this reaction can revers and has two arrow at an edge
        if row[7].value == 1:
            cell_dict['source_arrow'] = 'triangle'
            cell_dict['target_arrow'] = 'triangle'
        #else means row[7] == 0 and reversible column = 0
        #so this reaction can't revers
        #row[8] == 0 means an edge has only arrow at target side
        elif row[8].value == 0:
            cell_dict['source_arrow'] = 'none'
            cell_dict['target_arrow'] = 'triangle'
        #Confidence Score column
        cell_dict['flux'] = row[11].value

    data_list.append(cell_dict)

# Convert to JSON
data_json = json.dumps(data_list)

# Write file
with open('data.js', 'w') as f:
    f.write('var data = ')
    f.write(data_json)

