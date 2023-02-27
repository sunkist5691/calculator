import { Pressable, StyleSheet, Text } from "react-native";

export enum ButtonTypes {
  NUMBER = "NUMBER",
  OPERATOR = "OPERATOR",
}

const Colors = {
  NUMBER: ["#71717a", "#3f3f46"],
  OPERATOR: ["#f59e0b", "#b45309"],
};

type Props = {
  title: string;
  onPress: () => void;
  buttonStyle: object;
  buttonType?: ButtonTypes;
};

const Button = ({
  title,
  onPress,
  buttonStyle,
  buttonType = ButtonTypes.NUMBER,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: Colors[buttonType][0],
        },
        pressed && {
          backgroundColor: Colors[buttonType][1],
        },
        buttonStyle,
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: { justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 50,
    color: "#ffffff",
  },
});

export default Button;
