

function TransferItem({ transfer, user }) {

    const name = transfer.receiverId.name;
    const username = user.name;
    const senderName = transfer.senderId.name;

    return (
        <div>
            <h2>
                {senderName === username ? `To: ${name}` : `From: ${senderName}`} - {`${transfer.amount}VND`}
            </h2>
        </div>
    )
}

export default TransferItem