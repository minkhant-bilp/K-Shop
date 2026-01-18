import ScreenWrapper from "@/components/ui/layout/screen-wrapper"
import Transaction from "../home/transaction"



const History = () => {
    return (
        <ScreenWrapper headerShown={false} isSafeArea={false}>
            <Transaction />
        </ScreenWrapper>
    )
}

export default History