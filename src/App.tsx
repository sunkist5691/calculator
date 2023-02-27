import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Button, { ButtonTypes } from "./components/Button";

export const Operator = {
  CLEAR: "C",
  MINUS: "-",
  PLUS: "+",
  EQUAL: "=",
};

export default function App() {
  const [result, setResult] = useState<number>(0);
  const [formula, setFormula] = useState<string[]>([]);

  const width = (useWindowDimensions().width - 5) / 4;

  const calculate = () => {
    let calculatedNumber = 0;
    let operator = "";

    formula.forEach((v) => {
      if ([Operator.PLUS, Operator.MINUS].includes(v)) operator = v;
      else {
        if (operator == Operator.PLUS) {
          calculatedNumber += parseInt(v);
        } else if (operator == Operator.MINUS) {
          calculatedNumber -= parseInt(v);
        } else {
          calculatedNumber = parseInt(v);
        }
      }
    });
    setResult(calculatedNumber);
    setFormula([]);
  };

  const onPressNumber = (num: number) => {
    const last = formula[formula.length - 1];
    if (isNaN(parseInt(last))) {
      setResult(num);
      setFormula((prev) => [...prev, num.toString()]);
    } else {
      const newNumber = parseInt(last) != 0 ? parseInt(last) * 10 + num : num;
      setResult(newNumber);
      setFormula((prev) => {
        prev.pop();
        return [...prev, newNumber.toString()];
      });
    }
  };

  const onPressOperator = (operator: string) => {
    switch (operator) {
      case Operator.CLEAR:
        setResult(0);
        setFormula([]);
        break;

      case Operator.EQUAL:
        calculate();
        break;

      default: {
        const last = formula[formula.length - 1];
        if ([Operator.PLUS, Operator.MINUS].includes(last)) {
          setFormula((prev) => {
            prev.pop();
            return [...prev, operator];
          });
        } else {
          setFormula((prev) => [...prev, operator]);
        }
        break;
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.resultContainer}>
        <Text style={styles.result}>
          {result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.leftPad}>
          <View style={styles.number}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                title={num.toString()}
                onPress={() => onPressNumber(num)}
                buttonStyle={{ width, height: width, marginTop: 1 }}
              />
            ))}
          </View>

          <View style={styles.bottom}>
            <Button
              title="0"
              onPress={() => onPressNumber(0)}
              buttonStyle={{ width: width * 2, height: width }}
            />
            <Button
              title={Operator.EQUAL}
              onPress={() => onPressOperator(Operator.EQUAL)}
              buttonStyle={{ width, height: width }}
              buttonType={ButtonTypes.OPERATOR}
            />
          </View>
        </View>

        <View style={styles.operator}>
          <Button
            title={Operator.CLEAR}
            onPress={() => onPressOperator(Operator.CLEAR)}
            buttonStyle={{ width, height: width, marginBottom: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title={Operator.MINUS}
            onPress={() => onPressOperator(Operator.MINUS)}
            buttonStyle={{ width, height: width, marginBottom: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title={Operator.PLUS}
            onPress={() => onPressOperator(Operator.PLUS)}
            buttonStyle={{ width, height: width * 2, marginBottom: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },

  resultContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#000000",
  },

  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#000000",
    justifyContent: "space-evenly",
  },

  result: {
    color: "#ffffff",
    fontSize: 60,
    fontWeight: "700",
    paddingBottom: 30,
    paddingRight: 30,
  },

  leftPad: {
    width: "75%",
  },

  number: {
    flexDirection: "row",
    flexWrap: "wrap-reverse",
    justifyContent: "space-evenly",
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  operator: {},
});
