import useTranslation from "@/structure/hooks/useTranslation";
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { COUNTRY_LABELS, CountryCode } from '../data/gameData';
import DynamicText from '../ui/dynamic-text/dynamic-text';

type Props = {
    availableCountries: CountryCode[];
    selectedCountry: CountryCode;
    onSelectCountry: (country: CountryCode) => void;
};

export default function CountryToggleBar({ availableCountries, selectedCountry, onSelectCountry }: Props) {
    const { t } = useTranslation();

    if (!availableCountries || availableCountries.length === 0) return null;

    return (
        <View style={styles.toggleRow}>
            {availableCountries.map((countryCode) => {
                const isActive = selectedCountry === countryCode;

                // translation ရှိရင် ယူမယ်၊ မရှိရင် COUNTRY_LABELS ကစာကို ယူမယ်၊ အဲ့ဒါမှမရှိရင် countryCode ကိုပဲ ပြမယ်
                let displayLabel: string = countryCode;
                if (countryCode === "MM") displayLabel = t.myanmarFlag || COUNTRY_LABELS.MM;
                else if (countryCode === "PH") displayLabel = COUNTRY_LABELS.PH;
                else if (countryCode === "BR") displayLabel = COUNTRY_LABELS.BR;

                return (
                    <TouchableOpacity
                        key={countryCode}
                        onPress={() => onSelectCountry(countryCode)}
                        style={isActive ? styles.toggleButtonActive : styles.toggleButtonInactive}
                    >
                        <DynamicText fontWeight="bold" style={styles.whiteText}>
                            {displayLabel}
                        </DynamicText>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    toggleRow: {
        flexDirection: "row",
        marginTop: 20,
        backgroundColor: "rgba(255,255,255,0.1)",
        padding: 4,
        borderRadius: 12,
        flexWrap: "wrap",
    },
    toggleButtonActive: {
        flex: 1,
        minWidth: 80,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "#e11d48",
        margin: 2
    },
    toggleButtonInactive: {
        flex: 1,
        minWidth: 80,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "transparent",
        margin: 2
    },
    whiteText: {
        color: "white",
    }
});