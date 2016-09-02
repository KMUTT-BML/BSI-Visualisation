reaction = 'Sucrose[c] + H2O[c] -> beta-D-Fructose[c] + alpha-D-Glucose[c]'
temp = ''
if reaction.find('->') != -1:
	temp = [reaction[0:reaction.find('->')], reaction[reaction.find('->')+3:]]
elif reaction.find('<=>') != -1:
	temp = [reaction[0:reaction.find('<=>')], reaction[reaction.find('<=>')+4:]]
elif reaction.find('<-') != -1:
	temp = [reaction[0:reaction.find('<-')], reaction[reaction.find('<-')+3:]]
print(temp)
tempS = temp[0].split( )
tempT = temp[1].split( )
print(tempS)
print(tempT)
