import '../Pages/TransferList.scss'

function TransferItem({ transfer, user }) {

    const name = transfer.receiverId.name;
    const username = user.name;
    const senderName = transfer.senderId.name;

    return (
        <div>
            <p className={senderName === username ? 'red' : 'green'}>
                {senderName === username ? `To: ${name}` : `From: ${senderName}`} - {`${transfer.amount}VND`}
            </p>
        </div>
    )
}

export default TransferItem